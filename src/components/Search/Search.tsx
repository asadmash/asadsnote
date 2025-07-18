import { useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDocSearchKeyboardEvents, DocSearchModal } from '@docsearch/react';
import '@docsearch/css';
import './Search.css';
import { useAtom } from 'jotai';
import { searchModelOpen as searchModelOpenAtom } from '@/store/atoms';

const defaultTranslations = {
  searchBox: {
    resetButtonTitle: 'Search here',
    resetButtonAriaLabel: 'Clear Input',
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: 'Cancel',
  },
  startScreen: {
    recentSearchesTitle: 'Recent Searches',
    noRecentSearchesText: 'No recent searches',
    saveRecentSearchButtonTitle: 'Add to favorites',
    removeRecentSearchButtonTitle: 'Deleting Records',
    favoriteSearchesTitle: 'collect',
    removeFavoriteSearchButtonTitle: 'Delete favorites',
  },
  errorScreen: {
    titleText: 'Unable to obtain search results',
    helpText: 'Please check if the network connection is valid',
  },
  footer: {
    selectText: 'Select',
    selectKeyAriaLabel: 'Enter key',
    navigateText: 'Move the cursor',
    navigateUpKeyAriaLabel: 'Arrow up',
    navigateDownKeyAriaLabel: 'Arrow down',
    closeText: 'quit',
    closeKeyAriaLabel: 'Escape key',
    searchByText: 'Search by',
  },
  noResultsScreen: {
    noResultsText: 'No results found: ',
    suggestedQueryText: 'Please try searching',
    reportMissingResultsText: 'Make sure there should be search results?',
    reportMissingResultsLinkText: 'Please give us feedback.',
  },
};

export interface SearchProps {
  appId: string;
  apiKey: string;
  indexName: string;
}

export default function Search({
  appId,
  apiKey,
  indexName,
}: SearchProps) {
  const [searchModalOpen, setSearchModalOpen] = useAtom(searchModelOpenAtom);

  const onOpen = useCallback(() => {
    setSearchModalOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setSearchModalOpen(false);
  }, []);

  useDocSearchKeyboardEvents({
    isOpen: searchModalOpen,
    onOpen,
    onClose,
  });
  
  return (
    <>
      {searchModalOpen && createPortal(
        <DocSearchModal
          appId={appId}
          apiKey={apiKey}
          indexName={indexName}
          placeholder='Please enter the search text...'
          translations={defaultTranslations}
          initialScrollY={window.scrollY}
          onClose={onClose}
        />,
        document.body,
      )}
    </>
  )
}

