Ext.define("app.view.UserProfile", {
    config: {
        baseCls: "d-user-profile",

        tpl: Ext.create("Ext.Template", 
            "<h1>User Profile</h1>", {
            compiled: true
        })
    }
});

Ext.define("app.view.UserBilling", {
    config: {
        baseCls: "d-user-billing",

        tpl: Ext.create("Ext.Template", 
            "<h1>User Billing</h1>", {
            compiled: true
        })
    }
});

