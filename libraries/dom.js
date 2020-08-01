'use strict';

function DOM () {

    this.elements = {};
    this.selector = '';

    /** Get html elements */
    this._$ = function ( name ) {
        var elements,
            selector = '',
            prefix = '',
            element_name = '';

        if ( typeof name === 'object' ) prefix = 'object';
        else {
            prefix = name.charAt( 0 ),
            element_name = name.slice( 1 );
        }

            switch ( prefix ) {
                case '.':
                    elements = document.getElementsByClassName( element_name );
                    selector = 'class';
                    break;
    
                case '#':
                    elements = document.getElementById( element_name );
                    selector = 'id';
                    break;

                case 'object':
                    elements = name; // The name parameter is HTML Collection.

                    if ( typeof name.id !== 'undefined' ) selector = 'id';
                    else selector = 'class';

                    break;
    
                default:
                    return false;
        }


        this.elements = elements;
        this.selector = selector;

        return this;
    };


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


    /**
     * Set value to input html object.
     * Get value if value is undefined.
     */
    this.value = function( value ) {
        var elements = this.elements;

        if ( typeof value === 'undefined' ) {
            return elements.value;
        }
        else {
            if ( this.selector === 'class' ) {
                var i = 0;

                for ( i; i < elements.length; i += 1 ) {
                    var element = elements[ i ];

                    element.value = value;
                }
            }
            else if ( this.selector === 'id' ) elements.value = value;

            return this;
        }
    };


    /**
     * Get data from form.
     */
    this.formData = function() {
        var elements = this.elements;

        if ( this.selector === 'id' ) {
            var nodelist = elements.childNodes,
                data = {},
                i = 0;

            for ( i; i < nodelist.length; i += 1 ) {
                if ( nodelist[ i ].nodeType != 1 ) continue;

                var item = nodelist.item( i ); 

                console.log( item );

                if ( item.name !== '' ) data[ item.name ] = item.value;

                else {
                    var itemNodelist = item.childNodes,
                        j = i;

                    // for ( j; j < itemNodelist.length; j += 1 ) {
                    for ( j; j > 0; j += 1 ) {
                        // if ( itemNodelist[ j ].nodeType != 1 ) continue;

                        var itemChildren = itemNodelist.item( j );

                        console.log( itemChildren );

                        // if ( typeof itemChildren !== 'object' ) break;
                    }
                }
            }

            return data;
        }
        else if ( this.selector === 'class' ) console.log( 'DOM.js Error: formData cannot use class selector.' );
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
        else if ( typeof isModal === 'undefined' ) console.log( 'DOM.js Error: Modal is not undefined.' );
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