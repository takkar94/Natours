const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  //getting tour data first then render the template
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = (req, res) => {
  res.status(200).render('overview', {
    title: 'The Forest Hiker'
  });
};
