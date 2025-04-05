import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CardSearchOptions } from '@/types/CardSearchOptions'
import CardFlashList from '@/components/grid/CardFlashList'
import CardPicker from '@/components/picker/CardPicker'
import { StyleSheet, View } from 'react-native'
import SearchBar from '@/components/SearchBar'
import { Colors } from '@/constants/Colors'
import { fetchCards } from '@/lib/supabase'
import Page from '@/components/Page'
import { Card } from '@/types/Card'
import { debounce } from 'lodash'


const CardDatabase = () => {

  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(false)
  const [hasResults, setHasReults] = useState(true)
  const [isInitialized, setInitialized] = useState(false)
  const [menuExpanded, setMenuExpanded] = useState(false)
  
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
    setInitialized(false)
    if (cards.length == 0) {
      await handleSearch()
    }
    setInitialized(true)
  }

  useEffect(() => { init() }, [])

  const handleSearch = async (text: string | null = '', append: boolean = false) => {
    setLoading(true)
      searchOptions.current!.page = append ? searchOptions.current!.page + 1 : 0
      searchOptions.current!.name = text ? text : ''
      await fetchCards(searchOptions.current!)
        .then(values => {
          setHasReults(values.length > 0)
          append ?
            setCards(prev => [...prev, ...values]) :
            setCards([...values])
        })
    setLoading(false)
  }

  const onEndReached = async () => {
    if (!isInitialized) { return }
    await handleSearch(searchOptions.current!.name, true)
  }

  const applyFilters = async () => {
    await handleSearch(searchOptions.current!.name)
  }

  const debounceApplyFilters = useCallback(
      debounce(applyFilters, 500),
      []
  )  
  
  const toggleMenu = () => {
    setMenuExpanded(prev => !prev)
  }
  
  return (
    <Page title='Card Database' showReturnButton={true} returnButtonColor={Colors.white} >
      <>
        <SearchBar onChangeValue={handleSearch} toggleMenu={toggleMenu} />
        <View style={{display: menuExpanded ? 'flex' : 'none'}}>
          <CardPicker applyChanges={debounceApplyFilters as any} options={searchOptions.current} />
        </View>
        <CardFlashList 
          cards={cards} 
          loading={loading} 
          hasResults={hasResults}
          gap={20}
          numColumns={4}
          onEndReached={onEndReached}/>
      </>
    </Page> 
  )

}

export default CardDatabase

const styles = StyleSheet.create({})