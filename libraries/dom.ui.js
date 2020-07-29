let DOMUI = function () {
    // Inheritance to DOM
    DOMUI.prototype = new DOM();

    // DOMUI.prototype._$( '.modal' ).display( 'block' );
}, _domui = new DOMUI();