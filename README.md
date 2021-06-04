## Why was this application created?
This application was created to help Arizona fisherman decide which body of water they should spend their day at. Arizona fishing reports can be found all over the web, but most sources are outdated and lack the ability to filter by the parameters that are most important to you.

All results displayed on this application are timely as they are pulled daily from the official AZFGD website. The unique element of this application is the ability to filter results based on several fields, while also showing current temperature information (especially important in Arizona)

## Demo and high-level explanation of project architecture and code

<iframe width="560" height="315" src="https://www.youtube.com/embed/Nuo6J5y7gXc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Production implementation
If I were to push this application to production I would:

1. Run AZFishing.go every 24 hours with a cron job
2. Implement a method to clean up old mysql database entries
3. Upgrade the front-end to be more visually appealing
4. Not use so many different programming languages -- The goal of this project was to learn Golang from scratch and brush up on php. Otherwise I likely would have done everything with Node.js
