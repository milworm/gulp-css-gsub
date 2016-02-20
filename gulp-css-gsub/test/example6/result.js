function Layout() {
    this.html = [
        '<div class="a0">',
        '<div class="a1">',
        '<div class="a2">Cool guy :)</div>',
        '</div>',
        '<div class="a3"></div>',
        '<div class="a4"></div>',
        '<input type="number" />',
        '</div>'
    ];
}
Layout.prototype = {
    render: function () {
    }
};
new Layout().render();