import { useEffect, useRef, useState } from "react";
import { Animated, View, ViewProps } from "react-native";

export interface FadeViewProps extends Animated.AnimatedProps<ViewProps & React.RefAttributes<View>>{
    visible:boolean
}

export default function FadeView({
    children,
    style,
    visible = true,
    ...props
}:FadeViewProps){
    const [hidden, setHidden] = useState(!visible);
    const fadeAnim = useRef(new Animated.Value(visible?1:-1)).current;

    const fadeIn = ()=>{
        setHidden(false);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }

    const fadeOut = ()=>{
        Animated.timing(fadeAnim, {
            toValue: -1,
            duration: 250,
            useNativeDriver: true,
        }).start(()=>setHidden(true));
    }

    useEffect(()=>{
        if(visible) fadeIn();
        else fadeOut();
    },[visible]);

    return <Animated.View 
        style={[{ opacity:fadeAnim, display:hidden?"none":"flex" }, style]} 
        {...props}
    >
        {children}
    </Animated.View>
}