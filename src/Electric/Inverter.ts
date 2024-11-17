import Konva from "konva";
import { ComponentFactory } from "./ComponentFactory";
import { FONT_SIXE, MPPT_BOX_SIZE } from "./Constant";


class Inverter {

    private _group: Konva.Group

    get group() {
        return this._group
    }

    constructor(group: Konva.Group) {
        this._group = new Konva.Group()
        group.add(this._group)
    }


    public renderText(rectbox: any) {
        if (!rectbox) return

        const { x, y, width, height } = rectbox

        const labeAC = ComponentFactory.create('text', {
            x: x + MPPT_BOX_SIZE[1],
            y: y,
            text: "AC",
            fontSize: FONT_SIXE * 1.5,
            offset: { x: 80, y: -35 },

            fill: '#000',
        })

        if (labeAC) {
            this.group.add(labeAC)
        }

        const labelDC = ComponentFactory.create('text', {
            x: x,
            y: y + height,
            text: "DC",
            fontSize: FONT_SIXE * 1.5,
            fill: '#000',
            offset: { x: -30, y: 60 },
        })

        if (labelDC) {

            this.group.add(labelDC)
        }


    }

    render(data: any) {
        if (!data || !data.length) return

        for (let i = 0; i < data.length; i++) {

            const group = data[i];
            const { x, y, width, height } = group.getClientRect();

            const rect = ComponentFactory.create('rect', {
                x: x,
                y: y,
                width: MPPT_BOX_SIZE[1],
                height: height,
                stroke: '#000',
                strokeWidth: 1,
                drageable: false,
            })

            if (rect) {

                rect.offset({ x: -width + 1, y: 0 })
                this._group.add(rect)
            }

            if (rect) {
                const { x, y, height } = rect.getClientRect();

                /**
                  *对角线
                */
                const line = ComponentFactory.create('line', {
                    points: [x, y, x + MPPT_BOX_SIZE[1], y + height],
                    stroke: '#000',
                    strokeWidth: 1,
                })

                if (line) {
                    this._group.add(line)
                }

                this.renderText({ x, y, width, height })

            }
        }
    }
}

export {
    Inverter
}