const fs = require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.getAllTours =  (req, res) => {
    console.log(req.requestTime);
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
          tours,
        },
      });
  };
  
  
exports.getTour = (req, res) => {
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
  }
  
  
exports.createTour = (req, res) => {
   
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
    };
  
exports.updateTour = (req,res) => {
      
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
  };
  
exports.deleteTour = (req,res) => {
      
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
  };


