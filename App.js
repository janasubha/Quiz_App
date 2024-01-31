import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { englishData } from './components/EnglishQuestons'
import { useRef, useState } from 'react';
import QuestionItem from './components/QuestionItem';
const { height, width } = Dimensions.get('window')
export default function App() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [question, setQuestion] = useState(englishData);
  const listRef = useRef();
  const [modalVisible, SetModalVisible] = useState(false);
  const OnSelectOption = (index, x) => {
    const tempData = question;
    tempData.map((item, ind) => {
      if (index == ind) { // selected index and question ind if ==
        if (item.marked !== 1) {
          item.marked = 1
        }
        else {
          item.marked = x;  // selected x  and question item.marked 
        }

      }
    })
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    })
    setQuestion(temp);
  }
  const getTextScore = () => {
    let marks = 0;
    question.map(item => {
      console.log(item);
      if (item.marked == 1) {
        marks = marks + 5;
      }
      console.log(marks);
    });
    return marks;
  };
  const reset = () => {
    const tempData = question;
    tempData.map((item, ind) => {
      item.marked = 1;
    })
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    })
    setQuestion(temp);
  }
  return (
    <View style={{ flex: 2 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60, alignItems: 'center' }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          marginLeft: 20,
          color: '#000'
        }}>
          Enlish Question : {'' + currentIndex + '/' + englishData.length}
        </Text>
        <Text style={{ marginRight: 20, fontWeight: '600', color: 'black', }} onPress={() => {
          reset();
          listRef.current.scrollToIndex({ animated: true, index: 0 });
        }}>Reset</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x / width;
            setCurrentIndex((x + 1).toFixed(0));
          }}
          data={question}
          renderItem={({ item, index }) => {
            return <QuestionItem data={item} selectedOption={x => {
              OnSelectOption(index, x);
            }} />
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', position: 'absolute', bottom: 50, width: '100%' }}>
        <TouchableOpacity style={{ backgroundColor: currentIndex > 1 ? 'purple' : 'gray', height: 50, width: 100, borderRadius: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            if (currentIndex > 1) {
              listRef.current.scrollToIndex({ animated: true, index: parseInt(currentIndex) - 2 })
            }
          }}
        >
          <Text style={{ color: '#fff' }}>Previous</Text>
        </TouchableOpacity>
        {currentIndex == 8 ? (
          <TouchableOpacity style={{ backgroundColor: 'green', height: 50, width: 100, borderRadius: 10, marginLeft: 130, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              SetModalVisible(true);
            }}
          >
            <Text style={{ color: '#fff' }}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ backgroundColor: 'purple', height: 50, width: 100, borderRadius: 10, marginLeft: 130, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              if (question[currentIndex - 1].marked !== -1) {
                if (currentIndex < question.length) {
                  listRef.current.scrollToIndex({ animated: true, index: currentIndex })
                }
              }

            }}
          >
            <Text style={{ color: '#fff' }}>Next</Text>
          </TouchableOpacity>
        )}

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          SetModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgb(0,0,0,5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', width: '90%', height: 200, borderRadius: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 800, alignSelf: 'center', marginTop: 20 }}>Text Score</Text>
            <Text style={{ fontSize: 40, fontWeight: 800, alignSelf: 'center', marginTop: 20, color: 'green' }}>{getTextScore()}</Text>
            <TouchableOpacity style={{ alignSelf: 'center', height: 40, padding: 10, borderWidth: 1, borderRadius: 10, marginTop: 20, marginBottom: 20 }}
              onPress={() => {
                SetModalVisible(!modalVisible);
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
