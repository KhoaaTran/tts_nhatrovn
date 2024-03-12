import React from "react"
import { Pressable } from "react-native"
import { View } from "react-native"
import { UITextInput, UIIcon } from "../../components/atoms"

const UITextInputFilter = (props) => {
  const {
    onFilter,
    style,
    inputStyle,
    placeholder = "Tìm kiếm...",
    ...othersProps
  } = props
  return (
    <View
      style={[
        {
          gap: 5,
          flexDirection: "row",
          borderWidth: 1,
          borderRadius: 12,
          alignItems: "center",
          minHeight: 50,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <View style={{ position: "absolute", zIndex: 999, left: 10 }}>
          <UIIcon.CUSTOM name='search' />
        </View>
        <UITextInput
          {...othersProps}
          style={[
            {
              borderWidth: 0,
              flex: 1,
              paddingLeft: 40,
              height: "100%",
            },
            inputStyle,
          ]}
          placeholder={placeholder}
        />

        <Pressable
          disabled={!onFilter}
          style={{ paddingHorizontal: 10 }}
          onPress={onFilter}
        >
          <UIIcon.CUSTOM name='filter' />
        </Pressable>
      </View>
    </View>
  )
}

export default React.memo(UITextInputFilter)
