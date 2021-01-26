var app = new Vue({
    el: "#app",
    data: {},
    methods: {
        notify_open: function (type, title, message, duration) {
            this.$notify({
                type: type,
                title: title,
                message: message,
                duration: duration | 4600 
            });
        }
    },
    watch: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        this.notify_open('success', 'ready', 'ready');
    },
    updated: function () {

    }

})