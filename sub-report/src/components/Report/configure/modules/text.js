
export const text = (settings) => {



    const {
        backgroundColor,
        color,
        fontSize,
        fontWeight,
        lineHeight,
        setData,

        split,
        textAlign,
        textDecoration,

        link,
        linkHref,
        linkTarget,
        scroll,
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
        setData,
        backgroundColor,
        color,
        fontSize,
        fontWeight,
        lineHeight,
        link,
        linkHref,
        linkTarget,
        scroll,
        split,
        textAlign,
        textDecoration,
        textStyle
    }

}

