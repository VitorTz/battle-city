import { SafeAreaView, View, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import { Duelist } from '@/types/Duelist'
import { useAuthStore } from '@/store/authStore'
import { spFetchDuelists } from '@/lib/supabase'
import DuelistFlashList from '@/components/grid/DuelistFlashList'
import { debounce } from 'lodash'
import { SearchBar } from 'react-native-screens'
import SearchInput from '@/components/SearchInput'
import { Colors } from '@/constants/Colors'
import RotatingButton from '@/components/RotatingButton'
import DuelistPicker from '@/components/picker/DuelistPicker'
import { DuelistOptions } from '@/types/DuelistOptions'


const Duelists = () => {

  const { session } = useAuthStore()
  
  const [duelists, setDuelists] = useState<Duelist[]>([])
  const [loading, setLoading] = useState(false)
  const [menuIsOpen, setMenuOpen] = useState(false)
  const [hasResults, setHasResults] = useState(true)
  
  const isInitialized = useRef(false)
  const options = useRef<DuelistOptions>({
    country: '',
    name: '',
    page: 0,
    tags: []
  })

  const init = useCallback(async () => {
    if (duelists.length == 0) {
      setLoading(true)
      await spFetchDuelists(session?.user.id, options.current)
        .then(values => setDuelists(values))
      setLoading(false)
      isInitialized.current = true
    }
  }, [])

  const handleSearch = async (text: string | null = '', append: boolean = false) => {
    setLoading(true)
    options.current.page = append ? options.current.page + 1 : 0
    options.current.name = text ? text.trim() : null
    await spFetchDuelists(session?.user.id, options.current)
      .then(values => {
        setHasResults(values.length > 0)
        append ?
          setDuelists(prev => [...prev, ...values]) :
          setDuelists([...values])
      })
    setLoading(false)
  }

  useEffect(
    useCallback(() => {
      init()
    }, []),
    []
  )

  const onEndReached = async () => {
    if (!isInitialized.current) { return }
    await handleSearch(null, true)
  }

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  const applyChanges = async () => {
    await handleSearch(options.current.name)
  }

  const debounceApplyFilters = useCallback(
    debounce(applyChanges, 400),
    []
  )

  return (
    <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 0}]} >
        <TopBar title='Duelists' />
        <View style={{justifyContent: "center"}}>
          <SearchInput
            onChangeValue={handleSearch}
            placeholder='search' 
            placeholderTextColor={Colors.white} />
          <View style={{position: 'absolute', right: 10}} >
            <RotatingButton 
              iconColor={Colors.white}
              iconName='caret-up-circle-outline'  
              onPress={toggleMenu}/>
          </View>
        </View>
        <View style={{width: '100%', display: menuIsOpen ? 'flex' : 'none'}} >
          <DuelistPicker options={options.current} applyChanges={debounceApplyFilters as any}  />
        </View>
        <DuelistFlashList 
          duelists={duelists}
          loading={loading}
          hasResults={hasResults}
          onEndReached={onEndReached}
        />
    </SafeAreaView>
  )
}

export default Duelists

const styles = StyleSheet.create({
  
})