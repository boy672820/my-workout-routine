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

    /** Add event listener to Click */
    this.click = function ( func ) {
        var elements = this.elements;

        if ( elements.length >= 1 ) {
            var i = 0;
            for ( i; i < elements.length; i += 1 ) {
                var element = elements[ i ];
                element.addEventListener( 'click', func( element ) );
            }
        }
        else elements.addEventListener( 'click', func( elements ) );
    };

    /** Get data by Html object */
    // this.data = function ( name ) {
    //     var elements = this.elements,
    //         data;

    //     if ( elements.length >= 1 ) {
    //         var i = 0;

    //         for ( i; i < elements.length; i += 1 ) {
    //             var element = elements[ i ];

    //             data = element.dataset[ name ];
    //         }
    //     }
    //     else data = elements.dataset[ name ];

    //     return data;
    // }


    /** Apply elements */
    this._applyElements = function ( func, func2, value ) {
        var elements = this.elements;

        if ( elements.length >= 1 ) {
            var i = 0;

            for ( i; i < elements.length; i += 1 ) {
                var element = elements[ i ];

                element[ func ][ func2 ] = value;
            }
        }
        else elements[ func ][ func2 ] = value;
    };

}, _dom = new DOM();

let dom = function ( name ) { return _dom._$( name ) };



// 메서드 체인 문자열로 실행
// arguments: 해당 함수 인수의 배열 / 모든 함수에서 사용 가능한 지역 변수
// function executeFunctionByName( functionName, context ) {
    
//     var args = Array.prototype.slice.call( arguments, 2 ),
//         namespaces = functionName.split( '.' ),
//         func = namespaces.pop(),
//         i = 0;

//         for ( i; i < namespaces.length; i += 1 )
//             context = context[ namespaces[ i ] ];

//         return context[ func ].apply( context, args );
// }