const ti_bootloader = require("ti-bootloader");
const usb = require("usb");


var app = new Vue({
    el: "#app",
    data: {
        ports: null,
        hotplugged: null
    },
    methods: {
        selftDetection: function () {

            self = this;

            usb.on('attach', function (dev) {
                self.hotplugged = dev;
                // self.notify_open("info", "USB", "Device Connected");
                self.listPorts();
            });
            usb.on(`detach`, function (dev) {
                self.hotplugged = null;
                // self.notify_open("info", "USB", "Device Disconnected");
                self.listPorts();
            });


        },
        listPorts: function () {
            this.ports = ti_bootloader.listSerialPorts() || [];
        },
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
        ports: {
            handler: function (n, o) {
                

                if (n.length > 0) {
                    var notifyPorts = []
                    n.forEach(element => {
                        console.log(element);
                        notifyPorts.push(element.port)
                        
                    });
                    self.notify_open("info", "USB", `${notifyPorts}`);
                   
                }

            },
            deep: true
        },
        hotplugged: {
            handler: function (n, o) {
                //
            },
            deep: true
        }
    },
    created: function () {
        //
    },
    mounted: function () {
        //this.notify_open('success', 'ready', 'ready');
        this.selftDetection();

    },
    updated: function () {
        //this.listPorts();
    }

})