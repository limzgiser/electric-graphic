import Konva from "konva"
import { ComponentFactory } from "./ComponentFactory"
import { FONT_SIXE, MPPT_BOX_SIZE } from "./Constant"
import { Group } from "konva/lib/Group"



class Mppt {

    private _data: Array<string> = []
    private _group: Konva.Group
    private start = { x: 10, y: 11 }

    get size() {
        return this._data.length
    }


    constructor(data: Array<string>, group: Konva.Group) {
        this._data = data

        this._group = new Group()

        group.add(this._group)
    }

    public renderText() {

        const text = ComponentFactory.create('text', {
            x: this.start.x + MPPT_BOX_SIZE[0] / 2,
            y: this.start.y + MPPT_BOX_SIZE[1] / 2,
            text: 'MPPT1',
            fontSize: FONT_SIXE,
            // fontFamily: 'Calibri',

            fill: '#00',
        })

        if (!text) return

        text.rotate(90)
        text.offsetX(text.width() / 2)
        text.offsetY(text.height() / 2)

        this._group.add(text)
    }

    public renderBox() {

        const rect = ComponentFactory.create('rect', {

            x: this.start.x,
            y: this.start.y,
            width: MPPT_BOX_SIZE[0],
            height: MPPT_BOX_SIZE[1],

            stroke: '#000',
            strokeWidth: 2,
            drageable: false,
        })

        if (!rect) return


        this._group.add(rect)


    }

    public render() {
        this.renderBox()
        this.renderText()
    }
}


export {
    Mppt
}