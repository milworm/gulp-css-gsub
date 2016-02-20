function Layout() {
    this.html = [
        '<div class="white">',
            '<div class="left">',
                '<div class="user">Cool guy :)</div>',
            '</div>',
            '<div class="right"></div>',
            '<div class="fixed"></div>',
            '<input type="number" />',
        '</div>'
    ];
}

Layout.prototype = {
    render: function() {
        // do stuff
    }
}

new Layout().render();