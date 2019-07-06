import bbNotify from "./bbNotify";
import bbDialog from "./bbDialog";
import bb from "../bb";

const { ccclass, property } = cc._decorator;
@ccclass
export default class bbMain extends cc.Component {
    @property(cc.Prefab)
    notifyPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    dialogPrefab: cc.Prefab = null;

    notify: bbNotify;
    dialog: bbDialog;

    onLoad() {
        bb.on(bb.EventType.NOTIFY, this.onNotify, this);
        bb.on(bb.EventType.DIALOG, this.onDialog, this);
    };
    onDestroy() {
        bb.off(bb.EventType.NOTIFY, this.onNotify, this);
        bb.off(bb.EventType.DIALOG, this.onDialog, this);
    };

    start() {
        var node = cc.instantiate(this.notifyPrefab);
        cc.find("Canvas").addChild(node, cc.macro.MAX_ZINDEX);
        this.notify = node.getComponent(bbNotify);

        node = cc.instantiate(this.dialogPrefab);
        cc.find("Canvas").addChild(node, cc.macro.MAX_ZINDEX);
        this.dialog = node.getComponent(bbDialog);
    };

    onNotify(msg) {
        bb.log("onNotify", msg);
        this.notify.show(msg);
    };

    onDialog(title: string, content: string, ok: () => void, cancel: () => void) {
        bb.log("onDialog", title, content, ok, cancel);
        this.dialog.show(title, content, ok, cancel);
    };

};
