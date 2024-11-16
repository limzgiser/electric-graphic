import Konva from "konva"
import { Mppt } from "./Mppt"
import { Group } from "konva/lib/Group"

class ElectriGraphic {

    private _data = null
    private _group: Konva.Group
    private _props = null


    constructor(data: any, props: any, group: Konva.Group) {
        this._data = data

        this._group = new Group()

        group.add(this._group)
        this._props = props
    }



    public render() {

        new Mppt([], this._group).render()
    }
}


export {
    ElectriGraphic
}