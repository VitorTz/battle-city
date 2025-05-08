import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import SearchInput from '@/components/SearchInput'
import RotatingButton from '@/components/RotatingButton'
import { useState, useRef } from 'react'
import { Colors } from '@/constants/Colors'
import { DeckSearchOptions } from '@/types/DeckOptions'
import DeckFlashList from '@/components/grid/DeckFlashList'
import { debounce } from 'lodash'
import { spFetchDecks } from '@/lib/supabase'
import { Deck } from '@/types/Deck'
import DeckPicker from '@/components/picker/DeckPicker'


const DeckDatabase = () => {

  const [decks, setDecks] = useState<Deck[]>([])
  const [loading, setLoading] = useState(false)
  const [menuExpanded, setMenuExpanded] = useState(false)
  const [hasResults, setHasResults] = useState(true)
  
  const isInitialized = useRef(false)
  const searchOptions = useRef<DeckSearchOptions>({
    name: null,    
    page: 0,
    deckType: 'Structure'    
  })

  const init = useCallback(async () => {
    if (decks.length == 0) {
      setLoading(true)
      await spFetchDecks(searchOptions.current)
        .then(values => setDecks(values))
      setLoading(false)
      isInitialized.current = true
    }
  }, [])

  const handleSearch = async (text: string | null = '', append: boolean = false) => {
    setLoading(true)
      searchOptions.current!.page = append ? searchOptions.current!.page + 1 : 0
      searchOptions.current!.name = text ? text.trim() : ''
      await spFetchDecks(searchOptions.current!)
        .then(values => {
          setHasResults(values.length > 0)
          append ?
            setDecks(prev => [...prev, ...values]) :
            setDecks([...values])
        })
    setLoading(false)
  }

  useEffect(
    () => {
      init()
    },
    []
  )

  const onEndReached = async () => {
      if (!isInitialized.current) { return }
      await handleSearch(searchOptions.current!.name, true)
    }
  
    const toggleMenu = () => {
      setMenuExpanded(prev => !prev)
    }
  
    const applyFilters = async () => {
      await handleSearch(searchOptions.current!.name)
    }
  
    const debounceApplyFilters = useCallback(
        debounce(applyFilters, 500),
        []
    )

  return (
    <SafeAreaView style={[AppStyle.safeArea, {paddingBottom: 0}]} >
        <TopBar title='Deck Database'/>
        <View style={{width: '100%', justifyContent: "center"}} >
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
        <View style={{display: menuExpanded ? 'flex' : 'none'}}>
          <DeckPicker 
            applyChanges={debounceApplyFilters as any} 
            options={searchOptions.current} />
        </View>
        <DeckFlashList 
          decks={decks}
          loading={loading} 
          hasResults={hasResults}
          gap={20}
          numColumns={2}
          onEndReached={onEndReached}/>
    </SafeAreaView>
  )
}

export default DeckDatabase

const styles = StyleSheet.create({})