const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);


const getAllTours =  (req, res) => {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
};



app.get('/api/v1/tours', getAllTours);

app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);

    const id = req.params.id *1 ;
    if (id> tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: ' Inavlid Id'
        })
    }

    const tour = tours.find(el => el.id === id);
    
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
});

app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;
  const newTour = { id: newID, ...req.body };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
});


app.patch('/api/v1/tours/:id', (req,res) => {
    
    if (req.params.id * 1> tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: ' Inavlid Id'
        })
    }
    
    res.status(200).json({
        status: 'Success',
        data: {
            tour: "<Updated Tour Here>"
        }
    })
})


app.delete('/api/v1/tours/:id', (req,res) => {
    
    if (req.params.id * 1> tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: ' Inavlid Id'
        })
    }
    
    res.status(204).json({
        status: 'Success',
        data: null
    })
})



const port = 3000;
app.listen(port, () => {
  console.log(`running on ${port} ......`);
});
