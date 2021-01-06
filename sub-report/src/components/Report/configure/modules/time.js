export const time = (settings) => {



    const {
        backgroundColor,
        color,
        fontSize,
        fontWeight,
        lineHeight,
        split,
        textAlign,
        textDecoration,

        link,
        scroll,
        type,
    } = settings

    const textStyle = {
        textAlign:`${textAlign}`,
        fontSize:`${fontSize}px`,
        letterSpacing:`${split}px`,
        fontWeight:`${fontWeight}`,
        color:`${color}`,
        lineHeight:`${lineHeight}px`,
        backgroundColor:`${backgroundColor}`,
        textDecoration:`${textDecoration}`,
    }


    return  {
        backgroundColor,
        color,
        fontSize,
        fontWeight,
        lineHeight,
        link,
        scroll,
        type,
        split,
        textAlign,
        textDecoration,
        textStyle
    }

}

