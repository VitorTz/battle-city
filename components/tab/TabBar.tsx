import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useLinkBuilder } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import TabBarButton from './TabBarButton';


const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps ) => {
    const [focusedColor, baseColor ] = [Colors.white, Colors.paleGrey]
    const { buildHref } = useLinkBuilder();
  
    return (
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
            
                  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };     
          
          return (
            <TabBarButton
              key={route.name}
              href={buildHref(route.name, route.params)}            
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              style={styles.tabBarItem}
              isFocused={isFocused}
              routeName={route.name}
              color={isFocused ? focusedColor : baseColor}
              label={label}
            />
          )
        })}
      </View>
    );
  }


export default TabBar;


const styles = StyleSheet.create({
    container: {           
      borderTopWidth: 2,
      borderColor: Colors.gray,   
      paddingVertical: 14, 
      width: '100%',      
      position: 'absolute',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: Colors.background,      
      bottom: 0
    },
    tabBarItem: {
      flex: 1,      
      justifyContent: "center",      
      alignItems: "center"      
  }
    
})