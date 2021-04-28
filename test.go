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
func findWaters(body string) []string {
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(body))
	if err != nil {
		fmt.Println(err)
	}

	var waters []string
	// if branch for colorado river HERE. Set value of waters to the answer, then return at end of function
	doc.Find("strong").Each(func(i int, s *goquery.Selection) {
		txt := s.Text()
		if len(txt) >= 5 && !strings.EqualFold("no ", txt[0:3]) {
			// fmt.Printf("Header number %d: %s\n\n", i, txt)
			waters = append(waters, txt)
			fmt.Println(waters)
		}
	})
	// Remove last element of waters slice, removes AZGFD element
	return waters[0 : len(waters)-1]
}

func main() {
	results := makeRequest("https://www.azgfd.com/fishing/forecast/#central")
	arrayWaters := findWaters(results)
	fmt.Printf("Here are the waters for that website: %v", arrayWaters)
}

// https://www.azgfd.com/fishing/forecast/mogollon-rim/#mogollon ; Working, just need to remove last entry
// https://www.azgfd.com/fishing/forecast/#central ; Working, just need to remove last entry
// https://www.azgfd.com/fishing/forecast/se-central-az/#se-az ; Working, just need to remove last entry

/*

Webpages to pull from:
https://www.azgfd.com/fishing/forecast/#central -- normal
https://www.azgfd.com/fishing/forecast/colorado-river/#colorado-nw -- Only pull the top rating
https://www.azgfd.com/fishing/forecast/mogollon-rim/#mogollon -- normal
https://www.azgfd.com/fishing/forecast/se-central-az/#nCent-az -- normal

Colorado NW and SW give same results
nCent-az and southeast give same results

*/
