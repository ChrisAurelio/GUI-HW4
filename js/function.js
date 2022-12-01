/*
GitHub: ChrisAurelio
Name: Chris Aurelio
Email: christopher_aurelio@student.uml.edu
*/

// https://jqueryvalidation.org/documentation/
// https://write.corbpie.com/updating-an-input-value-from-a-jquery-slider/
// https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/jQueryUI1.8_Ch03_TabsWidget.pdf
// https://jqueryui.com/tabs/

function generateTable() {
    let table = '<table id="table">';
    let minColumn = parseInt(document.getElementById('minColumn').value);
    let maxColumn = parseInt(document.getElementById('maxColumn').value);
    let minRow = parseInt(document.getElementById('minRow').value);
    let maxRow = parseInt(document.getElementById('maxRow').value);

    // Populate the headr row and column
    table += '<th>';

    for (i = minRow; i <= maxRow; i++) {
        table += '<th>' + i + '</th>';
    }
        
    // Caclulate multiples and add to the table
    for (i = minColumn; i <= maxColumn; i++) {
        table += '<tr>';
        table += '<th>' + i + '</th>';
        for (j = minRow; j <= maxRow; j++) {
            table = table + '<td>' + i*j + '</td>';
        }
        table += '</tr>';
    }

    table += '</table>';
    document.getElementById('table').innerHTML = table;
}

// jQuery validation for input fields
$("#inputForm").validate({

    rules: {
        minColumn: {
            required: true,     // sets the input box to required
            min: -50,   // minimum allowed input
            max: 50,    // maximum allowed input
            step: 1,    // removes the potential for non-whole numbers
            lessThanEqual: '#maxColumn'     // checks if minColumn value is less than or equal to maxColumn value
        },
        maxColumn: {
            required: true,
            min: -50,
            max: 50,
            step: 1,
            greaterThanEqual: '#minColumn'
        },
        minRow: {
            required: true,
            min: -50,
            max: 50,
            step: 1,
            lessThanEqual: '#maxRow'
        },
        maxRow: {
            required: true,
            min: -50,
            max: 50,
            step: 1,
            greaterThanEqual: '#minRow'
        }
    },
    messages: {
        minColumn: {
            required: 'This field is required',
            min: 'Minimum must be between -50, 50',
            max: 'Maximum must be between -50, 50',
            lessThanEqual: 'Minimum must be <= maximum'
        },
        maxColumn: {
            required: 'This field is required',
            min: 'Minimum must be between -50, 50',
            max: 'Maximum must be between -50, 50',
            greaterThanEqual: 'Maximum must be >= minimum'
        },
        minRow: {
            required: 'This field is required',
            min: 'Minimum must be between -50, 50',
            max: 'Maximum must be between -50, 50',
            lessThanEqual: 'Minimum must be <= maximum'
        },
        maxRow: {
            required: 'This field is required',
            min: 'Minimum must be between -50, 50',
            max: 'Maximum must be between -50, 50',
            greaterThanEqual: 'Maximum must be >= minimum'
        }
    },

    errorPlacement: function(label, element) {
        label.addClass('message');      // creates class for error message styling
        label.insertAfter(element);     // specifies where to place error message
    },
});

$("#generateButton").click(function() {
    
    if ($("#inputForm").valid()) {      // if inputForm is valid...
        generateTable();                // generate the table
    }
    return false;
});

$.validator.addMethod("greaterThanEqual", function( value, element, param ) {
    var target = $( param );

    if ( this.settings.onfocusout && target.not( ".validate-greaterThanEqual-blur" ).length ) {
        target.addClass("validate-greaterThanEqual-blur" ).on( "blur.validate-greaterThanEqual", function() {
            $( element ).valid();
        } );
    }

    return parseInt(value) >= parseInt(target.val());
});

$.validator.addMethod("lessThanEqual", function( value, element, param ) {
    var target = $( param );

    if ( this.settings.onfocusout && target.not( ".validate-lessThanEqual-blur" ).length ) {
        target.addClass("validate-lessThanEqual-blur" ).on( "blur.validate-lessThanEqual", function() {
            $( element ).valid();
        } );
    }

    return parseInt(value) <= parseInt(target.val());
});