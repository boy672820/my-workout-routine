'use strict';

let DOM = function () {

    /** Get html elements */
    DOM.prototype._$ = function ( name ) {
        var prefix = name.charAt( 0 ),
            element_name = name.slice( 1 ),
            elements;

        switch ( prefix ) {
            case '.':
                elements = document.getElementsByClassName( element_name );
                break;

            case '#':
                elements = document.getElementById( element_name );
                break;

            default:
                return false;
        }

        this.elements = elements;

        return this;
    };

    /** Set style height to html elements */
    DOM.prototype.height = function ( value ) {

        var elements = this.elements;

        // class
        if ( elements.length >= 1 ) {
            var i = 0;

            for ( i; i < elements.length; i += 1 ) {
                var element = elements[ i ];
                element.style.height = value;
            }
        }

        // id
        else elements.style.height = value;

        return this;
    };

    DOM.prototype.marginTop = function ( value ) {

        var elements = this.elements;

        if ( elements.length >= 1 ) {
            var i = 0;
            
            for ( i; i < elements.length; i += 1 ) {
                var element = elements[ i ];
                element.style.marginTop = value;
            }
        }

        else elements.style.marginTop = value;

    };


    // Develop function
    DOM.prototype._propile = function() {
    }

}, _dom = new DOM();

let dom = function ( name ) { return _dom._$( name ) };




// _dom._propile();