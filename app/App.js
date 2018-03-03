import React from "react";
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Image,
   ListView
} from "react-native";
import NavBar, { NavTitle } from "react-native-nav";

function generateSampleData() {
   let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
   let bots = [];
   for (let i = 0; i < 6; i++) {
      bots.push({
         team: i < 3 ? 0 : 1,
         botId: i,
         directives: [
            { priority: 0, name: "move" },
            { priority: 1, name: "attack" },
            { priority: 2, name: "evade" }
         ]
      });
   }
   return ds.cloneWithRows(bots);
}

const BotItem = props => (
   <TouchableOpacity onPress={props.onPress} style={styles.BotItem}>
      <Image style={styles.BotItem__Image} />
      <View>
         <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Bot {props.botId}
         </Text>
         <Text>
            {props.directives
               .sort((x, y) => x.priority < y.priority)
               .map((x, i) => `\t${i + 1}. ${x.name}\n`)}
         </Text>
      </View>
   </TouchableOpacity>
);

export default class App extends React.Component {
   state = {
      bots: generateSampleData()
   };

   itemPressed = (id, item) => {
      console.log(item);
   };

   render() {
      return (
         <View style={styles.container}>
            <NavBar style={navbarStyle}>
               <NavTitle
                  style={{
                     color: "#fff"
                  }}
               >
                  Available Bots
               </NavTitle>
            </NavBar>
            <ListView
               style={styles.BotList}
               dataSource={this.state.bots}
               renderRow={item => (
                  <BotItem onPress={this.itemPressed} {...item} />
               )}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fafafa"
   },
   BotList: {
      marginTop: 10
   },
   BotItem: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexDirection: "row",
      elevation: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      borderWidth: 1,
      borderColor: "rgb(195, 217, 236)"
   },
   BotItem__Image: {
      height: 75,
      width: 75,
      marginRight: 20,
      backgroundColor: "rgb(195, 217, 236)"
   }
});

const navbarStyle = StyleSheet.create({
   statusBar: {
      backgroundColor: "rgb(0, 94, 255)"
   },
   navBar: {
      backgroundColor: "rgb(0, 94, 255)"
   }
});
