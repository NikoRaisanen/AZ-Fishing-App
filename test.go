package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

// Make the request to webpage and return response.Body as string
func makeRequest(url string) string {
	response, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}
	defer response.Body.Close()

	bodyText, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err)
	}
	return string(bodyText)
}

// Parse HTML to get name of bodies of water in fishing forecast
func parseRequest(body string) ([]string, []string) {
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(body))
	if err != nil {
		fmt.Println(err)
	}

	var waters []string
	var ratings []string
	validRating := map[string]bool{
		"alignnone size-full wp-image-9687": true,
		"alignnone size-full wp-image-9686": true,
		"alignnone size-full wp-image-9685": true,
		"alignnone size-full wp-image-9684": true,
	}

	// Get ratings of each body of water
	doc.Find("p img").Each(func(i int, s *goquery.Selection) {
		class, _ := s.Attr("class")
		if validRating[class] {
			ratings = append(ratings, class)
		} else {
			fmt.Printf("\n%v is INVALID\n", class)
		}
	})
	var sliceElements []string
	// Get name of each body of water
	doc.Find("p strong").Each(func(i int, s *goquery.Selection) {
		txt := s.Text()
		fmt.Println(txt)
		sliceElements = append(sliceElements, txt)
	})
	// Bodies of water that do not have reports for any reason
	for i := 0; i < len(sliceElements)-1; i++ {
		fmt.Printf("%d %v\n", i, sliceElements[i])
		if strings.Contains(sliceElements[i+1], "No") {
			fmt.Printf("%v should not have a report\n", sliceElements[i])
		} else if len(sliceElements[i]) <= 5 || strings.Contains(sliceElements[i], "No") {
			fmt.Println("Less than 5 chars.")
		} else {
			waters = append(waters, sliceElements[i])
			fmt.Printf("Else block %v\n", sliceElements[i])
		}
	}
	fmt.Println(waters)

	// Remove last element of waters slice, removes AZGFD element
	ratings = mapRatings(ratings)
	return ratings, waters
}

// mapRatings maps the CSS class of rating to human-readable rating
func mapRatings(ratings []string) []string {
	var humanRatings []string
	mapping := map[string]string{
		"alignnone size-full wp-image-9687": "Good",
		"alignnone size-full wp-image-9686": "Great",
		"alignnone size-full wp-image-9685": "Fair",
		"alignnone size-full wp-image-9684": "Poor",
	}
	for i := 0; i < len(ratings); i++ {
		humanRatings = append(humanRatings, mapping[ratings[i]])
	}
	hr := humanRatings

	// Remove the results for the 4 top icons in the legend
	if hr[0] == "Great" && hr[1] == "Good" && hr[2] == "Fair" && hr[3] == "Poor" {
		hr = hr[4:]
	}
	return hr
}

func main() {
	results := makeRequest("https://www.azgfd.com/fishing/forecast/#central")
	sliceRatings, sliceWaters := parseRequest(results)
	fmt.Printf("Ratings: %v; length: %d.\nWaters: %v, length %d", sliceRatings, len(sliceRatings),
		sliceWaters, len(sliceWaters))
}

// https://www.azgfd.com/fishing/forecast/mogollon-rim/#mogollon ;
// https://www.azgfd.com/fishing/forecast/#central ;
// https://www.azgfd.com/fishing/forecast/se-central-az/#se-az ; <-- Cluff Ranch Ponds show up even though they say they are closed to public...
// Solution: Force sliceRatings and sliceWaters to be equal in size.

/*

Webpages to pull from:
https://www.azgfd.com/fishing/forecast/#central -- normal
https://www.azgfd.com/fishing/forecast/colorado-river/#colorado-nw -- Only pull the top rating
https://www.azgfd.com/fishing/forecast/mogollon-rim/#mogollon -- normal
https://www.azgfd.com/fishing/forecast/se-central-az/#nCent-az -- normal

Colorado NW and SW give same results
nCent-az and southeast give same results

*/
