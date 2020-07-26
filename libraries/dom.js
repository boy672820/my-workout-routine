'use strict';

let DOM = function () {

    this.elements = {};

    /** Get html elements */
    this._$ = function ( name ) {
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
    this.height = function ( value ) {
        this._applyElements( 'style', 'height', value );

        return this;
    };


    /** Set style margin-top */
    this.marginTop = function ( value ) {
        this._applyElements( 'style', 'marginTop', value );
    };


    /** Apply elements */
    this._applyElements = function ( func, func2, value ) {
        var elements = this.elements,
            i = 0;

        

        if ( elements.length >= 1 ) {
            for ( i; i < elements.length; i += 1 ) {
                var element = elements[ i ];

                element[ func ][ func2 ] = value;
            }
        }
        else elements[ func ][ func2 ] = value;
    };

}, _dom = new DOM();

let dom = function ( name ) { return _dom._$( name ) };




function executeFunctionByName( functionName, context ) {
    var args = Array.prototype.slice.call( arguments, 2),
        namespaces = functionName.split( '.' ),
        func = namespaces.pop(),
        i = 0;

        for ( i; i < namespaces.length; i += 1 )
            context = context[ namespaces[ i ] ];

        return context[ func ].apply( context, args );
}