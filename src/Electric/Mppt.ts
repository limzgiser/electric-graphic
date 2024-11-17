import Konva from "konva"
import { ComponentFactory } from "./ComponentFactory"
import { BorderSize, ComponentSize, ComponentSpace, FONT_SIXE, IconImageSize, MPPT_BOX_SIZE, MPPT_INTERFACE_SIZE } from "./Constant"
import { Group } from "konva/lib/Group"
import { addImage, subImage } from "./data"


class ComLine {

    private _group: Konva.Group
    private addPostion = { x: 0, y: 0 }

    // MPPT被分为几段
    private segment: number = 1
    /**
     * 正级符号的位置
     * @param addPostion 
     */
    constructor(pos: { x: number, y: number }, group: Konva.Group, segment: number) {

        this._group = group
        this.addPostion = pos
        this.segment = segment

    }

    public render() {

        const { x, y } = this.addPostion

        let self = this
        const path = new Konva.Shape({

            sceneFunc: function (context, shape: any) {
                context.beginPath();
                context.stroke();
                context.moveTo(x, y + MPPT_INTERFACE_SIZE[0] / 2 + IconImageSize[0] / 2);
                context.lineTo(x - ComponentSize[0] / 2, y + MPPT_INTERFACE_SIZE[0] / 2 + IconImageSize[0] / 2);
                context.lineTo(x - ComponentSize[0] / 2, y);
                context.lineTo(x - ComponentSize[0] - ComponentSpace, y);
                context.moveTo(x - ComponentSize[0] - ComponentSpace, y + MPPT_INTERFACE_SIZE[1] / 2 + IconImageSize[0] / 2);
                context.lineTo(x - ComponentSize[0] - ComponentSpace - ComponentSize[0] / 2, y + MPPT_INTERFACE_SIZE[1] / 2 + IconImageSize[0] / 2);
                context.moveTo(x - 3 * ComponentSize[0] - 3 * ComponentSpace + ComponentSize[0] / 2, y);
                context.lineTo(x - 3 * ComponentSize[0] - 3 * ComponentSpace, y);
                context.moveTo(x - 3 * ComponentSize[0] - 3 * ComponentSpace, y + MPPT_INTERFACE_SIZE[1]);
                context.lineTo(x - 3 * ComponentSize[0] - 3 * ComponentSpace - ComponentSize[0] / 2, y + MPPT_INTERFACE_SIZE[1]);
                context.lineTo(x - 3 * ComponentSize[0] - 3 * ComponentSpace - ComponentSize[0] / 2, y);
                context.lineTo(x - 4 * ComponentSize[0] - 4 * ComponentSpace, y);

                context.stroke();
                context.beginPath();
                context.strokeStyle = '#ccc'

                context.moveTo(x - 4 * ComponentSize[0] - 4 * ComponentSpace, y + MPPT_INTERFACE_SIZE[1]);
                context.lineTo(x - 4 * ComponentSize[0] - 4 * ComponentSpace - ComponentSize[0] / 2, y + MPPT_INTERFACE_SIZE[1]);
                context.lineTo(x - 4 * ComponentSize[0] - 4 * ComponentSpace - ComponentSize[0] / 2, y + MPPT_BOX_SIZE[1] / self.segment);
                context.lineTo(x, y + MPPT_BOX_SIZE[1] / self.segment);

                context.stroke();
                context.strokeShape(shape);
            },

            // stroke: '#000',
            strokeWidth: BorderSize,
        });

        this._group.add(path);
    }
}

class Component {


    private _group: Konva.Group
    private addPostion = { x: 0, y: 0 }
    private subPostion = { x: 0, y: 0 }
    private rightTopPos = { x: 0, y: 0 }
    /**
     * 正级符号的位置
     * @param addPostion 
     */
    constructor(pos: { x: number, y: number }, group: Konva.Group) {

        this._group = group

        this.addPostion = pos

        this.rightTopPos = {
            x: pos.x + MPPT_INTERFACE_SIZE[0] / 2,
            y: pos.y - MPPT_INTERFACE_SIZE[1]
        }

        this.subPostion = {
            x: pos.x,
            y: pos.y + MPPT_INTERFACE_SIZE[1]
        }
    }

    private renderIcon = (imgUrl: string, pos: any) => {
        const imageObj = new Image();
        imageObj.src = imgUrl;

        imageObj.onload = () => {
            // 图片加载完毕后，创建 Konva 图像对象

            const image = ComponentFactory.create('image', {
                x: pos.x,
                y: pos.y,
                image: imageObj,
                width: IconImageSize[0],
                height: IconImageSize[1],
            })

            if (image) {
                image.offsetX(IconImageSize[0] / 2)
                image.offsetY(IconImageSize[1] / 2)
                this._group.add(image)
            }

        }
    }

    public renderComBox() {
        let box = ComponentFactory.create('rect', {
            x: this.rightTopPos.x,
            y: this.rightTopPos.y,
            width: ComponentSize[0],
            height: ComponentSize[1],

            stroke: '#000',
            opacity: 0.6,
            strokeWidth: BorderSize,
            drageable: false,
        })

        if (box) {
            box.offsetX(ComponentSize[0])
            this._group.add(box)

        }
    }


    public render() {
        this.renderIcon(addImage, this.addPostion)
        this.renderIcon(subImage, this.subPostion)
        this.renderComBox()
    }

}

class Mppt {

    private _data: Array<string> = []
    private _group: Konva.Group
    private start = { x: 1000, y: 11 }

    get size() {
        return this._data.length
    }

    get group() {
        return this._group
    }

    constructor(data: Array<string>, group: Konva.Group) {

        this._data = data

        this._group = new Group()

        group.add(this._group)
    }



    // MPPT Name
    public renderText() {

        const text = ComponentFactory.create('text', {
            x: this.start.x + MPPT_BOX_SIZE[0] / 2,
            y: this.start.y + MPPT_BOX_SIZE[1] / 2,
            text: 'MPPT1',
            fontSize: FONT_SIXE,


            fill: '#00',
        })

        if (!text) return

        text.rotate(90)
        text.offsetX(text.width() / 2)
        text.offsetY(text.height() / 2)

        this._group.add(text)
    }
    // MPPT box
    public renderBox() {

        const rect = ComponentFactory.create('rect', {

            x: this.start.x,
            y: this.start.y,
            width: MPPT_BOX_SIZE[0],
            height: MPPT_BOX_SIZE[1],

            stroke: '#000',
            strokeWidth: BorderSize,
            drageable: false,
        })

        if (!rect) return

        this._group.add(rect)
    }



    // 绘制+ / - 接口
    public renderInterFace = () => {

        console.log(this._data)
        let size = this._data.length

        let segment = size == 2 ? 5 : 3
        let count = size == 2 ? 4 : 2


        let nameIndex = 0

        const createReadLine = (position: [number, number], index: number) => {
            const [x, y] = position


            const lineStartPos = [x - MPPT_INTERFACE_SIZE[0], y]
            const lineEndPos = [x - MPPT_BOX_SIZE[1] / 2, y]

            if (index % 2 == 0) {
                // 绘制组件串线
                const comRect = new Component({ x: lineEndPos[0], y: lineEndPos[1] }, this._group)
                comRect.render()


                const comRect2 = new Component({ x: lineEndPos[0] - ComponentSize[0] - ComponentSpace, y: lineEndPos[1] }, this._group)
                comRect2.render()

                const comRect3 = new Component({ x: lineEndPos[0] - 3 * ComponentSize[0] - 3 * ComponentSpace, y: lineEndPos[1] }, this._group)
                comRect3.render()

                const comRect4 = new Component({ x: lineEndPos[0] - 4 * ComponentSize[0] - 4 * ComponentSpace, y: lineEndPos[1] }, this._group)
                comRect4.render()

                const comline = new ComLine({ x: lineEndPos[0], y: lineEndPos[1] }, this._group, segment)
                comline.render()



                const circel = ComponentFactory.create('circle', {
                    x: lineEndPos[0] - 2.4 * ComponentSize[0],
                    y: lineEndPos[1],
                    radius: IconImageSize[0] / 4,
                    fill: '#ccc',
                    stroke: '#000',
                    strokeWidth: 1,
                    draggable: false
                })


                if (circel) {
                    circel.offsetY(-5)
                    const circle2 = circel.clone()
                    circle2.offsetX(20)

                    const circle3 = circel.clone()
                    circle3.offsetX(40)


                    this.group.add(circel, circle2, circle3)
                }



                const label = ComponentFactory.create('text', {
                    x: lineEndPos[0],
                    y: lineEndPos[1],
                    text: this._data[nameIndex],
                    fontSize: FONT_SIXE,

                    fill: '#f00',
                })


                if (label) {
                    label.offsetY(label.height() + 15)
                    label.offsetX(ComponentSize[0] * 5 + ComponentSpace * 4 - 10)
                    this._group.add(label)
                }
                nameIndex++

            }

            return ComponentFactory.create('line', {
                points: [...lineStartPos, ...lineEndPos],
                stroke: index % 2 ? '#ccc' : 'red',
                strokeWidth: BorderSize,
            })
        }

        const self = this

        for (let i = 0; i < count; i++) {
            const sartY = (MPPT_BOX_SIZE[1] / segment) * (i + 1)

            const x = self.start.x;
            const y = self.start.y + sartY

            const box = ComponentFactory.create('rect', {
                x: x,
                y: y,
                width: MPPT_INTERFACE_SIZE[0],
                height: MPPT_INTERFACE_SIZE[1],
                stroke: '#000',
                strokeWidth: BorderSize,
                drageable: false,

            })

            if (box) {
                box.offsetX(box.width())
                box.offsetY(box.height() / 2)
                this._group.add(box)
            }
            const readLine = createReadLine([x, y], i)


            readLine && this._group.add(readLine)

        }

    }

    public render() {
        this.renderBox()
        this.renderText()
        this.renderInterFace()
    }
}


export {
    Mppt
}