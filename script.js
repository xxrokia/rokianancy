// Add smooth scroll effect to navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
//index html

// Wait for the DOM to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Get all the navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
  
    // Add event listeners to all the navigation links
    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        // Prevent the default link behavior
        e.preventDefault();
  
        // Get the ID of the page to scroll to
        const pageId = link.getAttribute('href').substring(1);
  
        // Get the page element
        const page = document.getElementById(pageId);
  
        // Scroll to the page element
        page.scrollIntoView({ behavior: 'smooth' });
      });
    });
  });


//COMPARING CITIES
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'c5188d0cc2msh6835a437888ccd3p106986jsnc573c2c6ea38',
    'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
  }
};

// Fetch the list of cities
fetch('https://cost-of-living-and-prices.p.rapidapi.com/cities', options)
  .then(response => response.json())
  .then(data => {
    // Populate the city search input fields with the list of cities
    const city1Input = document.getElementById('city1');
    const city2Input = document.getElementById('city2');
    data.forEach(city => { 
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.text = city.city_name;
      option2.text = city.city_name;
      city1Input.add(option1);
      city2Input.add(option2);
    });
  })
  .catch(err => console.error(err));

// Add event listener to compare button
const compareBtn = document.getElementById('compare-btn');
compareBtn.addEventListener('click', () => {
  const city1Name = document.getElementById('city1').value;
  const city2Name = document.getElementById('city2').value;

  // Fetch cost of living data for both cities
  Promise.all([
    fetch(`https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${city1Name}&country_name=`, options),
    fetch(`https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${city2Name}&country_name=`, options)
  ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      const city1Result = document.getElementById('city1-result');
      const city2Result = document.getElementById('city2-result');
      const chartCanvas = document.getElementById('chart');

      // Populate the comparison results
      city1Result.innerText = `${city1Name} cost of living index: ${data[0].cost_of_living_index}`;
      city2Result.innerText = `${city2Name} cost of living index: ${data[1].cost_of_living_index}`;

      // Populate the chart
      const chartData = {
        labels: [city1Name, city2Name],
        datasets: [
          {
            label: 'Cost of Living Index',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
            hoverBorderColor: 'rgba(255, 99, 132, 1)',
            data: [data[0].cost_of_living_index, data[1].cost_of_living_index]
          }
        ]
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      };

      new Chart
      type: 'bar',
        data; chartData,
        options; chartOptions
      });
    })
    .catch(err => console.error(err));


