// helper function
export function faceRotation(faceLandmarks) {
    let baseaxis1 = faceLandmarks[0]
    let baseaxis2 = faceLandmarks[1]

    let vecX = new THREE.Vector3(1, 0, 0)
    let vecY = new THREE.Vector3(0, 1, 0)
    let vecZ = new THREE.Vector3(0, 0, 1)

    let v1 = new THREE.Vector3(baseaxis1.x, baseaxis1.y, -baseaxis1.z)
    let v2 = new THREE.Vector3(baseaxis2.x, baseaxis2.y, -baseaxis2.z)

    let v = v1.clone().sub(v2).normalize()

    let quat = new THREE.Quaternion() // create one and reuse it
    quat.setFromUnitVectors(vecY, v)

    return quat
}

export function eyeRotation(
    upindex,
    downindex,
    ctx,
    cele,
    faceLandmarks,
    upfillname,
    downfillname,
    eyediffThreshold = 0.02
) {
    let flag

    // right
    let eyepoint1 = faceLandmarks[upindex]
    let normeyepointx1 = eyepoint1.x
    let normeyepointy1 = eyepoint1.y

    let eyepointx1 = normeyepointx1 * cele.width
    let eyepointy1 = normeyepointy1 * cele.height
    ctx.fillStyle = 'blue'
    ctx.font = '12px serif'
    ctx.fillText(upfillname, eyepointx1, eyepointy1 + 10)

    // left
    let eyepoint2 = faceLandmarks[downindex]

    let normeyepointx2 = eyepoint2.x
    let normeyepointy2 = eyepoint2.y

    let eyepointx2 = normeyepointx2 * cele.width
    let eyepointy2 = normeyepointy2 * cele.height
    ctx.fillStyle = 'blue'
    ctx.font = '12px serif'
    ctx.fillText(downfillname, eyepointx2, eyepointy2 + 10)

    let eyediff = Math.sqrt(
      (normeyepointx1 - normeyepointx2) ** 2 +
        (normeyepointy1 - normeyepointy2) ** 2
    )

    if (eyediff < eyediffThreshold) {
      flag = true
    } else {
      flag = false
    }

    return flag
}

export function mouthRotation(
    upindex,
    downindex,
    ctx,
    cele,
    faceLandmarks,
    mouthThreshold = 0.04
) {
    let flag

    let mouthpoint1 = faceLandmarks[upindex] // 12, 11
    // console.log("mouth point1:", mouthpoint1);
    let normmouthpointx1 = mouthpoint1.x
    let normmouthpointy1 = mouthpoint1.y
    let mouthpointx1 = normmouthpointx1 * cele.width
    let mouthpointy1 = normmouthpointy1 * cele.height
    ctx.fillStyle = 'blue'
    ctx.font = '12px serif'
    ctx.fillText('mouthUp', mouthpointx1, mouthpointy1 + 10)

    let mouthpoint2 = faceLandmarks[downindex] // 15, 16
    let normmouthpointx2 = mouthpoint2.x
    let normmouthpointy2 = mouthpoint2.y
    let mouthpointx2 = normmouthpointx2 * cele.width
    let mouthpointy2 = normmouthpointy2 * cele.height
    ctx.fillStyle = 'blue'
    ctx.font = '12px serif'
    ctx.fillText('mouthDown', mouthpointx2, mouthpointy2 + 10)

    let mouthdiff = Math.sqrt(
      (normmouthpointx1 - normmouthpointx2) ** 2 +
        (normmouthpointy1 - normmouthpointy2) ** 2
    )

    if (mouthdiff > mouthThreshold) {
      flag = true
    } else {
      flag = false
    }

    return flag
}

// helper function
const deg2rad = (deg) => {
    return (deg * Math.PI) / 180.0
}
const rad2deg = (rad) => {
    return (rad * 180.0) / Math.PI
}

// helper function for updating vrm
export function updateJoint(rootindex, middleindex, endindex, landmarks){
    let min = -360
    let max = 360

    let root = landmarks[rootindex]
    let middle = landmarks[middleindex]
    let end = landmarks[endindex]
    let node = new THREE.Vector3(middle.x, middle.y, -middle.z)
    let leaf = new THREE.Vector3(end.x, end.y, -end.z)
    let from = leaf.sub(node).normalize()
    let to = node.sub(root).normalize()
    let quat = new THREE.Quaternion()
    let axis = from.clone().cross(to).normalize()
    let angle = Math.acos(from.dot(to))
    angle = Math.max(deg2rad(min), Math.min(deg2rad(max), angle))
    quat.setFromAxisAngle(axis, angle)
    return quat
}

export function updateHandJoint(a1index, a2index, handlandmarks){
    let axis1 = handlandmarks[a1index]
    let axis2 = handlandmarks[a2index]

    let vv1 = new THREE.Vector3(axis1.x, axis1.y, -axis1.z)
    let vv2 = new THREE.Vector3(axis2.x, axis2.y, -axis2.z)

    let vY = new THREE.Vector3(0, 1, 0)
    let vx = new THREE.Vector3(1, 0, 0)
    let vz = new THREE.Vector3(0, 0, 1)

    let vv = vv1.clone().sub(vv2).normalize()

    let handquat = new THREE.Quaternion() // create one and reuse it
    handquat.setFromUnitVectors(vY, vv)

    let quatY = new THREE.Quaternion()
    quatY.setFromAxisAngle(vx, Math.PI / 2)

    handquat = handquat.multiply(quatY)

    return handquat
}
