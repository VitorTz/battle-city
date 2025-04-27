import { SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AppStyle } from '@/style/AppStyle'
import TopBar from '@/components/TopBar'
import { Colors } from '@/constants/Colors'
import CardFlashList from '@/components/grid/CardFlashList'
import { debounce } from 'lodash'
import SearchInput from '@/components/SearchInput'
import { Card } from '@/types/Card'
import { CardSearchOptions } from '@/types/CardOptions'
import { spFetchCards } from '@/lib/supabase'
import RotatingButton from '@/components/RotatingButton'
import CardPicker from '@/components/picker/CardPicker'


const CardDatabase = () => {

  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(false)
  const [menuExpanded, setMenuExpanded] = useState(false)
  const [hasResults, setHasResults] = useState(true)
  
  const isInitialized = useRef(false)
  const searchOptions = useRef<CardSearchOptions>({
    name: null,
    attributes: [],
    archetypes: [],
    frametypes: [],
    races: [],
    types: [],
    page: 0,
    sortBy: 'name',
    sortOrder: 'ASC'
  })

  const init = async () => {
    if (cards.length == 0) {
      setLoading(true)
      await spFetchCards(searchOptions.current)
        .then(values => setCards(values))
      setLoading(false)
      isInitialized.current = true
    }
  }

  const handleSearch = async (text: string | null = '', append: boolean = false) => {
    setLoading(true)
      searchOptions.current!.page = append ? searchOptions.current!.page + 1 : 0
      searchOptions.current!.name = text ? text.trim() : ''
      await spFetchCards(searchOptions.current!)
        .then(values => {
          setHasResults(values.length > 0)
          append ?
            setCards(prev => [...prev, ...values]) :
            setCards([...values])
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
        <TopBar title='Cards' />
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
          <CardPicker 
            applyChanges={debounceApplyFilters as any} 
            options={searchOptions.current} />
        </View>
        <CardFlashList 
          cards={cards} 
          loading={loading} 
          hasResults={hasResults}
          gap={20}
          numColumns={3}
          onEndReached={onEndReached}/>
    </SafeAreaView>
  )
}

export default CardDatabase

const styles = StyleSheet.create({
  optionsIcon: {
    position: 'absolute',
    right: 10
  }
})