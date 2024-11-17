import Konva from "konva";
import { ComponentFactory } from "./ComponentFactory";
import { FONT_SIXE, LineOpacity, MPPT_BOX_SIZE } from "./Constant";


class Inverter {

    private _group: Konva.Group

    private inverTerBox = new Konva.Group()
    // 逆变器对角线
    private _acDcLines = new Konva.Group()
    private arrowGroup = new Konva.Group()

    private calcTabelGroup = new Konva.Group()

    public calcTableName = new Konva.Group()

    get group() {
        return this._group
    }

    constructor(group: Konva.Group) {

        this._group = new Konva.Group()

        this.inverTerBox.add(this._acDcLines)
        this.group.add(this.calcTableName)

        this.group.add(this.inverTerBox)
        this._group.add(this.arrowGroup)

        this._group.add(this.calcTabelGroup)

        group.add(this._group)
    }

    /**
     *  逆变器AC/DC
     * @param rectbox 
     * @returns 
     */
    public renderText(rectbox: any) {
        if (!rectbox) return

        const { x, y, width, height } = rectbox

        const labeAC = ComponentFactory.create('text', {
            x: x + MPPT_BOX_SIZE[1],
            y: y,
            text: "AC",
            fontSize: FONT_SIXE * 1.4,
            offset: { x: 80, y: -35 },

            fill: '#000',
        })

        if (labeAC) {
            this.inverTerBox.add(labeAC)
        }

        const labelDC = ComponentFactory.create('text', {
            x: x,
            y: y + height,
            text: "DC",
            fontSize: FONT_SIXE * 1.4,
            fill: '#000',
            offset: { x: -30, y: 60 },
        })

        if (labelDC) {

            this.inverTerBox.add(labelDC)
        }


    }

    /**
     * 逆变器出口箭头
     */
    public renderBoxInterFace(points: any) {
        if (!points) return

        let [x1, y1, x2, y2] = points
        // const { x, y, width, height } = rectbox

        let item = new Konva.Group()
        const rect = ComponentFactory.create('rect', {
            x: x2,
            y: y1 + (y2 - y1) / 2 - 25,
            width: 20,
            height: 50,
            stroke: '#000',
            strokeWidth: 1,
            opacity: LineOpacity,
            drageable: false,
        })
        if (rect) {

            item.add(rect)
        }

        const arrow = new Konva.Arrow({
            points: [x2, y1 + (y2 - y1) / 2, x2 + 50, y1 + (y2 - y1) / 2],
            stroke: '#000',
            strokeWidth: 1,
            opacity: LineOpacity,
            pointerLength: 20,  // 箭头头部的长度
            pointerWidth: 30,   // 箭头头部的宽度
        });

        item.add(arrow)

        this.arrowGroup.add(item)

    }

    public rendePowerGrid() {

        const { x, y, width, height } = this.calcTableName.getClientRect()


        let group = new Konva.Group()

        this.group.add(group)
        const circle = ComponentFactory.create('circle', {
            x: x,
            y: y,
            radius: 40,
            fill: '#fff',
            stroke: '#000',
            strokeWidth: 1,
            opacity: LineOpacity,
        })

        if (circle) {

            group.add(circle)
        }

        const labelText = ComponentFactory.create('text', {
            x: x,
            y: y,
            text: "电网",
            fontSize: FONT_SIXE * 1.4,
            fill: '#000',
        })

        if (labelText) {
            labelText.offsetX(labelText.width() / 2)
            labelText.offsetY(labelText.height() / 2)
            group.add(labelText)
        }


        const line = ComponentFactory.create('line', {
            points: [x + width, y + height / 2, x + width / 2 + 260, y + height / 2],
            stroke: '#000',
            strokeWidth: 1,
            opacity: LineOpacity,
        })


        line && this.group.add(line)

        group.offset({
            x: -width * 2,
            y: -height / 2
        })
    }


    /**
     * 计量表
     */
    public renderCalcTable() {
        if (!this.arrowGroup) return

        // const { x, y, width, height } = this.arrowGroup.getClientRect();

        const arrowGroupChildren = this.arrowGroup.getChildren()

        // 计量连线，竖直线坐标
        let columnsPoints: any = []
        arrowGroupChildren.forEach(children => {
            const { x, y, width, height } = children.getClientRect();

            const lineLen = 200

            const line = ComponentFactory.create('line', {
                points: [x + width / 2, y + height / 2, x + width / 2 + lineLen, y + height / 2],
                stroke: '#000',
                strokeWidth: 1,
                opacity: LineOpacity,
            })

            line && this.calcTabelGroup.add(line)

            columnsPoints.push(...[x + width / 2 + lineLen, y + height / 2])
        })
        // 计量连线
        const line = ComponentFactory.create('line', {
            points: columnsPoints,
            stroke: '#000',
            strokeWidth: 1,

            opacity: LineOpacity,
        })

        line && this.calcTabelGroup.add(line)

        // 计量表名称

        {
            const { x, y, width, height } = this.calcTabelGroup.getClientRect();


            const rect = ComponentFactory.create('rect', {
                x: x,
                y: y,
                width: width,
                height: 70,
                stroke: '#000',
                strokeWidth: 1,
                drageable: false,
            })

            if (rect) {
                rect.offsetX(-width - 200)
                rect.offsetY(-height / 2 + 35)
                rect && this.calcTableName.add(rect)
            }

            const line = ComponentFactory.create('line', {
                points: [x, y, x + width, y],
                stroke: '#000',
                strokeWidth: 1
            })

            if (line) {
                line.offsetX(-width)
                line.offsetY(-height / 2)
                this.calcTabelGroup.add(line)
            }


            // 计量表
            const labelText = ComponentFactory.create('text', {
                x: x,
                y: y,
                text: "计量表",
                fontSize: FONT_SIXE * 1.4,
                fill: '#000',
            })

            if (labelText) {
                labelText.offsetX(-width - 200 - 60)
                labelText.offsetY(-height / 2 + 15)
                this.calcTableName.add(labelText)
            }

        }

    }

    render(data: any, source: any) {
        if (!data || !data.length) return

        if (!source || !source.length) return

        if (source.length !== data.length) return


        const getInverterName = (index: number) => {


            let name = Object.keys(source[index])

            return name.length ? name[0] : ''

        }


        for (let i = 0; i < data.length; i++) {

            const group = data[i];
            const { x, y, width, height } = group.getClientRect();

            const rect = ComponentFactory.create('rect', {
                x: x,
                y: y,
                width: MPPT_BOX_SIZE[1],
                height: height,
                stroke: '#000',
                opacity: LineOpacity,
                strokeWidth: 1,
                drageable: false,
            })

            if (!rect) continue


            rect.offset({ x: -width - 10, y: 0 })
            this._acDcLines.add(rect)


            {
                const { x, y, height } = rect.getClientRect();

                let points = [x, y, x + MPPT_BOX_SIZE[1], y + height]

                // 逆变器名称
                const nameText = ComponentFactory.create('text', {
                    x: x,
                    y: y,
                    text: getInverterName(i),
                    fontSize: FONT_SIXE * 1.4,
                    fill: '#000',
                })

                if (nameText) {
                    nameText.offsetY(nameText.height())
                    this._acDcLines.add(nameText)
                }
                /**
                  *对角线
                */
                const line = ComponentFactory.create('line', {
                    points: points,
                    stroke: '#000',
                    strokeWidth: 1,
                    opacity: LineOpacity,
                })

                if (line) {
                    this._acDcLines.add(line)
                }

                this.renderText({ x, y, width, height })

                this.renderBoxInterFace(points)


            }
        }

        this.renderCalcTable()

        this.rendePowerGrid()
    }
}

export {
    Inverter
}