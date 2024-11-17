import Konva from "konva"
import { Mppt } from "./Mppt"
import { Group } from "konva/lib/Group"

import { Inverter } from "./Inverter"

class ElectriGraphic {

    private _data: any = null
    private _group: Konva.Group
    private _props = null

    constructor(data: any, props: any, group: Konva.Group) {
        this._data = data

        this._group = new Group()

        group.add(this._group)
        this._props = props
    }


    /**
     * 逆变器
     */
    public renderInverter(data: any, source: any) {


        let group = new Konva.Group()
        this._group.add(group)
        new Inverter(group).render(data,source)

    }

    /**
     * mpp包括窜线的组件
     */
    public redernMppt(data: any, group: Konva.Group, names: string[]) {

        let offset = 0

        if (!data || !data.length) return 0

        let offsets: any = [

        ]

        data.forEach((item: any, index: number) => {

            const mppt = new Mppt(item, group, names[index])

            mppt.render()

            const { height } = mppt.group.getClientRect();

            offsets.push({
                value: index == 0 ? 0 : -height + 1,
                group: mppt.group,
            })

        });

        for (let i = 0; i < offsets.length; i++) {
            const item = offsets[i];

            const group: Konva.Group = item.group

            group.offsetY(item.value)

            offset += item.value

        }

        return offset

    }

    /**
     * mppt 集合
     */
    public renderMpptList(data: any) {


        const getMpptGroupList = () => {
            let groups = []

            for (let i = 0; i < data.length; i++) {

                const item = data[i]
                if (!item || !Object.keys(item).length) continue

                const inverterName = Object.keys(item)[0]

                const mppt = Object.values(item[inverterName])
                const names = Object.keys(item[inverterName])

                const group = new Konva.Group()

                this._group.add(group)

                groups.push(group)
                this.redernMppt(mppt, group, names)
            }

            return groups
        }

        const udpateOffset = (groups: any) => {

            let offsets = []
            let offset = 0
            for (let i = 0; i < groups.length; i++) {
                const group = groups[i];
                const { height } = group.getClientRect();


                offsets.push({
                    value: i == 0 ? 0 : -offset,
                    group: group
                })
                offset += (height + 40)
            }

            offsets.forEach(item => {
                item.group.offsetY(item.value)
            })

        }

        const groups = getMpptGroupList()

        udpateOffset(groups)
        return groups

    }

    public render() {


        const data: Array<any> = this._data

        if (!Array.isArray(data) || !data.length) return


        const mppListGroup = this.renderMpptList(data)


        this.renderInverter(mppListGroup, data)


        this._group.offset({ x: -1000, y: -100 })
        this._group.scale({ x: 0.6, y: 0.6 })
    }
}


export {
    ElectriGraphic
}