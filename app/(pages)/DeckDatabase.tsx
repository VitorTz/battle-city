import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DeckSearchOptions } from '@/types/DeckSearchOptions'
import CardFlashList from '@/components/grid/CardFlashList'
import DeckPicker from '@/components/picker/DeckPicker'
import { StyleSheet, View } from 'react-native'
import SearchBar from '@/components/SearchBar'
import { Colors } from '@/constants/Colors'
import { fetchDecks } from '@/lib/supabase'
import Page from '@/components/Page'
import { Deck } from '@/types/Deck'
import { debounce } from 'lodash'
import DeckFlashList from '@/components/grid/DeckFlashList'


const DeckDatabase = () => {

  const [decks, setDecks] = useState<Deck[]>([])
  const [loading, setLoading] = useState(false)
  const [hasResults, setHasReults] = useState(true)
  const [isInitialized, setInitialized] = useState(false)
  const [menuExpanded, setMenuExpanded] = useState(false)
  
  const searchOptions = useRef<DeckSearchOptions>({
    name: null,
    attributes: [],
    archetypes: [],
    frametypes: [],
    races: [],
    types: [],
    page: 0,
    deckType: ['Any']
  })

  const handleSearch = async (text: string | null = '', append: boolean = false) => {
    setLoading(true)
      searchOptions.current!.page = append ? searchOptions.current!.page + 1 : 0
      searchOptions.current!.name = text ? text : ''
      await fetchDecks(searchOptions.current!)
        .then(values => {
          setHasReults(values.length > 0)
          append ?
            setDecks(prev => [...prev, ...values]) :
            setDecks([...values])
        })
    setLoading(false)
  }

  const init = async () => {
    setInitialized(false)
    if (decks.length == 0) {
      await handleSearch()
    }
    setInitialized(true)
  }

  useEffect(() => { init() }, [])

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
    <Page title='Deck Database' showReturnButton={true} returnButtonColor={Colors.white} >
      <>
        <SearchBar onChangeValue={handleSearch} toggleMenu={toggleMenu} />
        <View style={{display: menuExpanded ? 'flex' : 'none'}}>
          <DeckPicker applyChanges={debounceApplyFilters as any} options={searchOptions.current} />
        </View>
        <DeckFlashList 
          decks={decks} 
          hasResult={hasResults} 
          loading={loading} 
          columns={2}
          gap={30}
          onEndReached={onEndReached}/>
      </>
    </Page> 
  )

}

export default DeckDatabase

const styles = StyleSheet.create({})