'use strict';

function DOM () {

    this.elements = {};
    this.selector = '';

    /** Get html elements */
    this._$ = function ( name ) {
        var elements, selector;

        if ( typeof name === 'object' ) {
            elements = name;
            selector = 'class';
        }
        else {
            var prefix = name.charAt( 0 ),
                element_name = name.slice( 1 );

            switch ( prefix ) {
                case '.':
                    elements = document.getElementsByClassName( element_name );
                    selector = 'class';
                    break;
    
                case '#':
                    elements = document.getElementById( element_name );
                    selector = 'id';
                    break;
    
                default:
                    return false;
            }
        }


        this.elements = elements;
        this.selector = selector;

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


    /**
     * Set display to..
     * @param {*} bool 
     */
    this.display = function ( value ) {
        this._applyElements( 'style', 'display', value );
    }


    /**
     * inner html.
     * @param {*} text 
     */
    this.text = function ( text ) {
        var elements = this.elements;

        if ( this.selector === 'class' ) {
            var i = 0;
            for ( i; i < elements.length; i += 1 ) {
                var element = elements[ i ];
                element.innerHTML = text;
            }
        }
        else if ( this.selector === 'id' ) elements.innerHTML = text;
    };

    
    /**
     * Get value from input box.
     */
    this.value = function () {
        var elements = this.elements,
            value = '';

        // if ( this.selector === 'class' ) {
        //     var i = 0;
        //     for ( i; i < elements.length; i += 1 ) {
        //         var element = elements[ i ];
        //         value = element.value;
        //     }
        // }
        // else if ( this.selector === 'id' ) value = elements.value;

        return 'test';
    };


    /** Add event listener to Click */
    this.click = function ( func ) {
        var elements = this.elements;

        if ( this.selector === 'class' ) {
            var i = 0;
            for ( i; i < elements.length; i += 1 ) {
                var element = elements[ i ];
                element.addEventListener( 'click', func );
            }
        }
        else if ( this.selector === 'id' ) elements.addEventListener( 'click', func );
    };


    /**
     * Add event listener to Submit.
     * @param {*} func 
     */
    this.submit = function ( func ) {
        var elements = this.elements;

        if ( this.selector === 'class' ) {
            var i = 0;
            for ( i; i < elements.length; i += 1 ) {
                var element = elements[ i ];
                element.addEventListener( 'submit', func );
            }
        }
        else if ( this.selector === 'id' ) elements.addEventListener( 'submit', func );
    };


    /** Get data by Html object */
    this.data = function ( name ) {
        var elements = this.elements,
            data;

        if ( elements.length >= 1 ) {
            var i = 0;

            for ( i; i < elements.length; i += 1 ) {
                var element = elements[ i ];

                data = name === undefined ? element.dataset : element.dataset[ name ];
            }
        }
        else data = name === undefined ? elements.dataset : elements.dataset[ name ];

        return data;
    }


    /** Apply elements */
    this._applyElements = function ( func, func2, value ) {
        var elements = this.elements;

        if ( this.selector === 'class' ) {
            var i = 0;

            for ( i; i < elements.length; i += 1 ) {
                var element = elements[ i ];

                element[ func ][ func2 ] = value;
            }
        }
        else if ( this.selector === 'id' ) elements[ func ][ func2 ] = value;
    };

    /**
     * Set value to input html object
     */
    this.value = function( value ) {
        var elements = this.elements,
            elements_length = elements.length;

        if ( elements_length >= 1 ) {
            var i = 0;

            for ( i; i < elements_length; i += 1 ) {
                var element = elements[ i ];

                element.value = value;
            }
        }
        else elements.value = value;
    };


    /**
     * Modal UI
     */
    this.modal = function () {
        var modalEventlistener = this.elements,
            isModal = this._$( '.modal' ).elements.length === 0 ? undefined : this._$( '.modal' ).elements;

        if ( typeof isModal === 'object' ) {
            var _this = this;

            // Activate modal when an event(Click) occurs.
            this._$( modalEventlistener ).click( function () {
                var dataEntries = Object.entries( this.dataset );

                // Set input by modal
                for ( const [ key, value ] of dataEntries ) {
                    _this._$( '#' + key ).value( value );
                }
                
                // Display modal
                _this._$( '.modal' ).display( 'block' );
            } );

            // 클릭 이벤트에서 이미 .modal객체를 elements로 할당했기 때문에 _this로 사용
            this._$( '.close' ).click( function () {
                _this.display( 'none' );
            } );

        }
        else if ( typeof isModal === 'undefined' ) console.log( 'DOM Error: Modal is not undefined.' );
    };

};

let _dom = new DOM(),
    dom = function ( name ) { return _dom._$( name ) };



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