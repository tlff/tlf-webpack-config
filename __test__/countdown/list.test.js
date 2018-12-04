import list from "../../src/js/countdown/list";
let app;
beforeEach(() => {
    document.body.innerHTML=`
        <div id="app"></div>
    `;
    app=new list("app");
})
test("test",() => {
    expect(app.el).toMatchSnapshot();
})