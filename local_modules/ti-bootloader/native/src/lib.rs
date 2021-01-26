use neon::object::PropertyKey;
use neon::prelude::*;

pub struct Device {
    device: ti_sbl::Device<serial::SystemPort>,
}

declare_types! {
    pub class JsDevice for Device {
        init(mut cx) {
            let arg0 = cx.argument::<JsValue>(0)?;

            todo!();
        }
    }
}

struct EraseFlashRange;

impl Task for EraseFlashRange {
    type Output = i32;
    type Error = String;
    type JsEvent = JsNumber;

    fn perform(&self) -> Result<Self::Output, Self::Error> {
        Ok(20)
    }

    fn complete(
        self,
        mut cx: TaskContext,
        result: Result<Self::Output, Self::Error>,
    ) -> JsResult<Self::JsEvent> {
        Ok(cx.number(result.unwrap()))
    }
}

pub fn erase_flash_range(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let device = cx.argument::<JsDevice>(0)?;
    let callback = cx.argument::<JsFunction>(1)?;
    EraseFlashRange.schedule(callback);
    Ok(cx.undefined())
}

pub fn list_serial_ports(mut cx: FunctionContext) -> JsResult<JsArray> {
    use ti_sbl::ports::PortInfo;

    let ports = PortInfo::list_all();

    let js_ports = JsArray::new(&mut cx, ports.len() as u32);

    for (i, port) in ports.iter().enumerate() {
        let js_port = cx.empty_object();

        let js_port_str = cx.string(port.port.to_string_lossy());
        let js_name_str = cx.string(port.name.to_string_lossy());

        js_port.set(&mut cx, "port", js_port_str)?;
        js_port.set(&mut cx, "name", js_name_str)?;

        if let Some(usb_info) = &port.usb_info {
            let js_port_usb_info = cx.empty_object();

            let js_num_if = cx.number(usb_info.num_if as u32);
            let js_vid = cx.string(format!("{:04X}", usb_info.vid));
            let js_pid = cx.string(format!("{:04X}", usb_info.pid));
            let js_serial = usb_info.serial.as_ref().map(|s| cx.string(s));
            let js_manufacturer = usb_info.manufacturer.as_ref().map(|m| cx.string(m));
            let js_product = usb_info.product.as_ref().map(|p| cx.string(p));
            let js_interface = usb_info.interface.as_ref().map(|i| cx.string(i));

            js_port_usb_info.set(&mut cx, "numIf", js_num_if)?;
            js_port_usb_info.set(&mut cx, "vid", js_vid)?;
            js_port_usb_info.set(&mut cx, "pid", js_pid)?;
            set_opt(&mut cx, *js_port_usb_info, "serial", js_serial)?;
            set_opt(&mut cx, *js_port_usb_info, "manufacturer", js_manufacturer)?;
            set_opt(&mut cx, *js_port_usb_info, "product", js_product)?;
            set_opt(&mut cx, *js_port_usb_info, "interface", js_interface)?;

            js_port.set(&mut cx, "usbInfo", js_port_usb_info)?;
        } else {
            let js_null = cx.null();
            js_port.set(&mut cx, "usbInfo", js_null)?;
        }

        js_ports.set(&mut cx, i as u32, js_port)?;
    }

    Ok(js_ports)
}

fn set_opt<'a, O, C, K, W>(
    cx: &mut C,
    obj: O,
    key: K,
    val: Option<Handle<'_, W>>,
) -> NeonResult<bool>
where
    O: Object,
    C: Context<'a>,
    K: PropertyKey,
    W: Value,
{
    if let Some(val) = val {
        obj.set(cx, key, val)
    } else {
        let js_null = cx.null();
        obj.set(cx, key, js_null)
    }
}

register_module!(mut cx, {
    cx.export_class::<JsDevice>("Device")?;

    cx.export_function("eraseFlashRange", erase_flash_range)?;
    cx.export_function("listSerialPorts", list_serial_ports)?;

    Ok(())
});
