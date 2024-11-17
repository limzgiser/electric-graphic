const ElectricData = [

    {
        "SG10RT-20": {
            "MPPT1": [
                "N1-PV1-9"
            ],
            "MPPT2": [
                "N1-PV2-9"
            ]
        }
    },
    {
        "SG15RT-20": {
            "MPPT1": [
                "N2-PV3-9",
                "N2-PV4-9"
            ],
            "MPPT2": [
                "N2-PV5-9"
            ]
        }
    }
]



const data2 = { "aNumNew": [["N1-PV1-9", "N1-PV2-9"], ["N2-PV3-9", "N2-PV4-9", "N2-PV5-9"]], "parallelMeshBox": "并网箱", "sNum": [[["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9"], ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9"]], [["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9"], ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9"], ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9"]]], "aStrNew": [["N1-PV1-9(+)~N1-PV2-9(+)", "N1-PV1-9(-)~N1-PV2-9(-)"], ["N2-PV3-9(+)~N2-PV5-9(+)", "N2-PV3-9(-)~N2-PV5-9(-)"]], "aNum": [["ZC010101_9", "ZC010201_9"], ["ZC020101_9", "ZC020102_9", "ZC020201_9"]], "photovoltaicCable": [{ "searchValue": null, "createBy": null, "createTime": null, "updateBy": null, "updateTime": null, "remark": null, "params": {}, "stationId": null, "materialNo": "JC000028", "materialName": null, "materialSpec": "光伏专用电缆_PV_TUV_4mm2_B_黑_600/1000V_6B_S", "materialNum": "43", "materialLength": null, "materialTotalLength": null, "materialUnit": "M", "primaryClassify": null, "secondaryClassify": null, "serialNum": 5 }, { "searchValue": null, "createBy": null, "createTime": null, "updateBy": null, "updateTime": null, "remark": null, "params": {}, "stationId": null, "materialNo": "JD000318", "materialName": null, "materialSpec": "光伏专用电缆_PV_TUV_4mm2_B_红_600/1000V_6B_S", "materialNum": "71", "materialLength": null, "materialTotalLength": null, "materialUnit": "M", "primaryClassify": null, "secondaryClassify": null, "serialNum": 6 }], "aStr": [["ZC010101_9(+)~ZC010201_9(+)", "ZC010101_9(-)~ZC010201_9(-)"], ["ZC020101_9(+)~ZC020201_9(+)", "ZC020101_9(-)~ZC020201_9(-)"]], "serialNo": ["逆变器NB01(SG10RT-20)", "逆变器NB02(SG15RT-20)"] }




const addImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAudJREFUSEu1lUtoE1EUhv8zSe/UjRU3IjaTKH3MEKVUpForRQRtVy7ciFJBVFwJilAfoFRRBKtduBRc+agbRUFQ6kaFajfW1vrIxBabTLJQUUGh1Nxm5sjUpDbPjlXvah7/Pd89/7nnXsJ/HuQlfjQkdNtGA4GWMeznzOnX4SS+eplbEhAJqFuI+ACBmxi0pCAY4yUU3NLj8mw5UFGAqYmrAHYBmARTLxRnwMc0ACGT6ZTaDOJmAtYBaAMQZXL2GPH0s2KgAoCpCZ4WEkbYdg4ayfTjUis0NXEewBH3v8LYWZeQN/O1OYCIVrGfQJcZOG1Y8pQXjyOhyhA5zrir9QlZWTuG1Ox5M4C3AbFSIbwC0Kdbst1L8KzG1PwtgNIP4IJuyemMsmMGYAbFHTA2wUdN+ngqmg+IaGI6o1KZZe1ipjYjkXpYAIgG1U9gvl9vyd3FVu8CCOjSLVl0Y0SqxSpSMALgmG5JtzaZUgL4bQ8d0q3UpfkA3DlRTVgMDOiW3J4DMDXRAeCarXBjODY1nP2ZtWWWuMvdANn3fLsyNod1S9blACIB9TAR9/iErKodw/fZANeWUgXPtysarOhhpn26JavyLPK3KqQ8YaZ2I5Hqm69Fpqb2M5xJw5ranAN4U43FPkV8Kbf/5yryaA0W2lJ8ZqDHsOTxwm0aEMMgfCjVA3MBIkGxjRi3QejQ4/JGsT44AcYZAN26JY/+SaO5WlMTSQBp4atYu2J84mMBICMyAdSzoiw3Yj9iXiFmoOIRiDYyUacRT10s2snux0jQv55YefpL4GzQrXTmuTTKDKhXQLzXPRz1uGzIVxZ05buA2OEQejPCbnZw3UhK94yaGUMhLFpgq61EfI6BMIB7uiW3FltG0bYfrYFqS+HWo9OdRECCCYNgjgHUAqARgB/AIBGdrI+nHpTKseyVmbnV3GCrM0GXEugFwxliYGjCP3V3zXt8K1crT3ey12J7tuhvAs5Z5H8Z3I31E8TFJiiG7gOGAAAAAElFTkSuQmCC'
const subImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAArlJREFUSEu1lUtoE1EUhv8zaelDsK5ErLoxGzv3JsZQfIMrXfpaqAu3FVtdWUFRsAVFwbrSKnbrQl1odVlXgm9KGpN7Jm7iRq2IKyvYB23n2BtnJGnTJhoNJAy5555v7j9zv0v4zx+qpn80Gl3e3Ny8QUTitp6IMuPj4+/y+fz3SvOXBGitz4jIIQAbF2n0lojuG2OuLAYqC3Bdt42I7gDYBOAJgGEiGq6rqxu2jWZmZtpFpB2A/e4GMCIiRz3Py80HLQAopS7MFfUEhdeYuXupGJRSfQBOBTW9zBzOLfxVAojH462zs7Ofgpy3GWNeVcrYjmutt4rIS3sdiUTWZDKZ0XBeCUAp9RDAfgBRZn5fTfOwRim1HkAewCAzH1gA0Fp3icgNEenyPO/mnzQPa13X7SSifiI6YYzpL4lIKZUB8IWZ9/xN86KVDAFYxcy/Xmn7k0wmW6ampr4B6GPm0zUCrgLobmhoWJFKpcYKgLa2th2O4zwTkSOe592rBeC67mEiuuv7/s5cLve8AFBKHQdgc1/HzB+VUg8A2KiWAXhaAbgLwA8AQ8x8UCm1FsAHAJ3MfKsA0Fp3iMjt+vr61nQ6/bkWQCKRWD09PT1KRMeMMQMFQCwW2+z7/msi2meMeVxLRFrrvSLyyHGcLdls9k0BYGXW2Ng4BuASM5+vBaCUugjg3OTkZIuV4e+NppRKz+X29R+9piuZOVGyDwJzXgZQ0T+LrTD0EhGdDQ07XxUpa1AiqtpDIazIRyPMnCzrokDTXjBYtY+KPAQRcYu1XU7XVrdW2ba4opdC/wQ31cPMvcURlj1wAm1fD8xqD5ysiKSI6EUA3k5ENoZYcOAMRiKRk8WaLhvR/IcXGLYjaFTu2WaJaCA0Z7mCqg59K8OJiQntOI62TXzfN01NTcbKrNKeqQpQqclS4z8BBs8sKNgCkz8AAAAASUVORK5CYII='

export {
    ElectricData,
    addImage,

    subImage
}