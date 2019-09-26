var MapMethods = {
  LINEAR: 0,
  LOGARITHM: 1,
};

var isValid = true;
var method = MapMethods.LINEAR;

$('.dropdown-menu a').on('click', function() {
  $('.dropdown-toggle').html($(this).html());
  if ($(this).index() == 0) {
    method = MapMethods.LINEAR;
  } else {
    method = MapMethods.LOGARITHM;
  }

  resetInputsValidation();
  setText($('#result'), 'Result:');
});

function convert() {

  var x = parseInt($('#x').val());
  var min = parseInt($('#min').val());
  var max = parseInt($('#max').val());
  var a = parseInt($('#a').val());
  var b = parseInt($('#b').val());

  isValid = true;

  if (isNaN(x)) {
    setInvalid($('#x'));
  } else {
    setValid($('#x'));
  }

  if (isNaN(min) && isNaN(max)) {
    setText($('#min-max-feedback'), 'Please enter a value for min and max');
    setInvalid($('#min'));
    setInvalid($('#max'));
  } else if (isNaN(min) && !isNaN(max)) {
    setText($('#min-max-feedback'), 'Please enter a value for min');
    setInvalid($('#min'));
    setValid($('#max'));
  } else if (!isNaN(min) && isNaN(max)) {
    setText($('#min-max-feedback'), 'Please enter a value for max');
    setValid($('#min'));
    setInvalid($('#max'));
  } else if (min > max) {
    setText($('#min-max-feedback'), 'Min cannot be greater than max');
    setInvalid($('#min'));
    setInvalid($('#max'));
  } else if (min == max) {
    setText($('#min-max-feedback'), 'Min cannot be equal to max');
    setInvalid($('#min'));
    setInvalid($('#max'));
  } else {
    setValid($('#min'));
    setValid($('#max'));
  }

  if (isNaN(a) && isNaN(b)) {
    setText($('#a-b-feedback'), 'Please enter a value for a and b');
    setInvalid($('#a'));
    setInvalid($('#b'));
  } else if (isNaN(a) && !isNaN(b)) {
    setText($('#a-b-feedback'), 'Please enter a value for a');
    setInvalid($('#a'));
    setValid($('#b'));
  } else if (!isNaN(a) && isNaN(b)) {
    setText($('#a-b-feedback'), 'Please enter a value for b');
    setValid($('#a'));
    setInvalid($('#b'));
  } else if (a > b) {
    setText($('#a-b-feedback'), 'a cannot be greater than b');
    setInvalid($('#a'));
    setInvalid($('#b'));
  } else if (a == b) {
    setText($('#a-b-feedback'), 'a cannot be equal to b');
    setInvalid($('#a'));
    setInvalid($('#b'));
  } else if (a == min && b == max) {
    setText($('#a-b-feedback'), 'a cannot be equal to min and b to max');
    setInvalid($('#a'));
    setInvalid($('#b'));
  } else {
    setValid($('#a'));
    setValid($('#b'));
  }

  //form.addClass('was-validated');

  //console.log(x, min, max, a, b);

  if (isValid) {

    var result = 'Result: ';

    switch (method) {
      case MapMethods.LINEAR:
        result += map(x, min, max, a, b);
        break;

      case MapMethods.LOGARITHM:
        result += mapLog(x, min, max, a, b);
        break;
    }

    console.log(result);

    setText($('#result'), result);
  }
}

function map(x, min, max, a, b) {
  return ((x - min) * (b - a)) / (max - min) + a;
}

function mapLog(x, min, max, a, b) {
  var logA = Math.log(a);
  var logB = Math.log(b);
  return Math.exp(((x - min) * (logB - logA)) / (max - min) + logA);
}

function setText(what, text) {
  what.text(text);
}

function resetInputsValidation(){
  $('#x').removeClass('is-invalid');
  $('#x').removeClass('is-valid');

  $('#min').removeClass('is-invalid');
  $('#min').removeClass('is-valid');

  $('#max').removeClass('is-invalid');
  $('#max').removeClass('is-valid');

  $('#a').removeClass('is-invalid');
  $('#a').removeClass('is-valid');

  $('#b').removeClass('is-invalid');
  $('#b').removeClass('is-valid');
}

function setValid(what) {
  what.removeClass('is-invalid');
  what.addClass('is-valid');
}

function setInvalid(what) {
  what.removeClass('is-valid');
  what.addClass('is-invalid');

  isValid = false;
}
