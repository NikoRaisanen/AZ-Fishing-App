package main

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	_ "github.com/go-sql-driver/mysql"
)

type dbEntry struct {
	number string
	name   string
	rating string
	time   string
	region string
}

func newEntry(i string, name string, rating string, time string, region string) dbEntry {
	w := dbEntry{
		number: i,
		name:   name,
		rating: rating,
		time:   time,
		region: region,
	}
	return w
}

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
			// Pass
		}
	})
	var sliceElements []string

	// Get name of each body of water
	doc.Find("p strong").Each(func(i int, s *goquery.Selection) {
		txt := s.Text()
		sliceElements = append(sliceElements, txt)
	})

	// Bodies of water that do not have reports for any reason
	for i := 0; i < len(sliceElements)-1; i++ {
		if strings.Contains(sliceElements[i+1], "No") {
			// pass
		} else if len(sliceElements[i]) <= 5 || strings.Contains(sliceElements[i], "No") ||
			strings.Contains(sliceElements[i], "Cluff Ranch") {
			// pass
		} else {
			waters = append(waters, sliceElements[i])
		}
	}

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

func prepData(r []string, w []string, ref string) ([15][]string, int) {
	// Set region based off of ref
	var dataSlice [15][]string
	regionMap := map[string]string{
		"https://www.azgfd.com/fishing/forecast/se-central-az/#se-az":        "Southeast Arizona",
		"https://www.azgfd.com/fishing/forecast/#central":                    "Central Arizona",
		"https://www.azgfd.com/fishing/forecast/mogollon-rim/#mogollon":      "Mogollon Rim",
		"https://www.azgfd.com/fishing/forecast/colorado-river/#colorado-nw": "NW Colorado River",
	}

	w = w[0:len(r)]
	for i := 0; i < len(w); i++ {
		name := w[i]
		rating := r[i]
		iString := strconv.Itoa(i)
		current_time := time.Now().Format("2006-01-02")
		dbLine := newEntry(iString, name, rating, current_time, regionMap[ref])
		dataSlice[i] = append(dataSlice[i], dbLine.number, dbLine.name,
			dbLine.rating, dbLine.time, dbLine.region)
	}

	// Remove empty arrays
	var counter int
	for _, array := range dataSlice {
		if array == nil {
			counter++
		}
	}
	return dataSlice, counter
}

func aggregateData(d [][]string, d2 [][]string, d3 [][]string, d4 [][]string) [][]string {
	var finalData [][]string
	for i := 0; i < len(d); i++ {
		finalData = append(finalData, d[i])
	}
	for i := 0; i < len(d2); i++ {
		finalData = append(finalData, d2[i])
	}
	for i := 0; i < len(d3); i++ {
		finalData = append(finalData, d3[i])
	}
	finalData = append(finalData, d4[0])
	return finalData
}

func db_insert(name string, rating string, region string) {
	pw := get_db_pw("password.txt")
	db, err := sql.Open("mysql", "root:"+pw+"@tcp(127.0.0.1:3306)/az_water_info")

	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	insert, err := db.Query("insert into waters (name, rating, region) values (?, ?, ?)", name, rating, region)
	if err != nil {
		panic(err.Error())
	}
	defer insert.Close()
}

func db_select() []dbEntry {
	var allResults []dbEntry
	// var validResults []dbEntry
	pw := get_db_pw("password.txt")
	db, err := sql.Open("mysql", "root:"+pw+"@tcp(127.0.0.1:3306)/az_water_info")

	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	results, err := db.Query("SELECT * FROM waters")
	if err != nil {
		panic(err.Error())
	}

	for results.Next() {
		var water dbEntry

		err := results.Scan(&water.number, &water.name, &water.rating, &water.region, &water.time)

		if err != nil {
			log.Fatal(err)
		}
		// Add results to array here
		allResults = append(allResults, water)
	}

	return allResults
}

// Pulling db credentials from file for security
func get_db_pw(path string) string {
	pw, _ := ioutil.ReadFile(path)
	pw_string := string(pw)
	return pw_string
}

func main() {
	// Start request #1
	url1 := "https://www.azgfd.com/fishing/forecast/se-central-az/#se-az"
	results := makeRequest(url1)
	sliceRatings, sliceWaters := parseRequest(results)
	entryData, counter := prepData(sliceRatings, sliceWaters, url1)
	cleanData := append(entryData[0 : len(entryData)-counter][:])
	// End request #1
	// Start request #2
	url2 := "https://www.azgfd.com/fishing/forecast/#central"
	results2 := makeRequest(url2)
	sliceRatings2, sliceWaters2 := parseRequest(results2)
	entryData2, counter2 := prepData(sliceRatings2, sliceWaters2, url2)
	cleanData2 := append(entryData2[0 : len(entryData2)-counter2][:])
	// End request #2
	// Start request #3
	url3 := "https://www.azgfd.com/fishing/forecast/mogollon-rim/#mogollon"
	results3 := makeRequest(url3)
	sliceRatings3, sliceWaters3 := parseRequest(results3)
	entryData3, counter3 := prepData(sliceRatings3, sliceWaters3, url3)
	cleanData3 := append(entryData3[0 : len(entryData3)-counter3][:])
	// End request #3
	// Start request #4
	url4 := "https://www.azgfd.com/fishing/forecast/colorado-river/#colorado-nw"
	results4 := makeRequest(url4)
	sliceRatings4, sliceWaters4 := parseRequest(results4)
	entryData4, counter4 := prepData(sliceRatings4, sliceWaters4, url4)
	cleanData4 := append(entryData4[0 : len(entryData4)-counter4][:])
	// End request #4

	// Variable allData contains all data to be inserted into DB
	allData := aggregateData(cleanData, cleanData2, cleanData3, cleanData4)
	for i := 0; i < len(allData); i++ {
		db_insert(allData[i][1], allData[i][2], allData[i][4])
	}
	var dbResults []dbEntry = db_select()
	fmt.Println(dbResults)
}
