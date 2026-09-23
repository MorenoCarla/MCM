import { useCallback, useState } from 'react';
import Header from './components/Header';
import CategoryView from './components/CategoryView';
import MomentView from './components/MomentView';
import SongListView from './components/SongListView';
import SongView from './components/SongView';
import SongEditor from './components/SongEditor';
import { getCategoryById } from './data/categories';
import { createId, loadSongs, saveSongs } from './utils/storage';

const VIEWS = {
  categories: 'categories',
  moments: 'moments',
  songs: 'songs',
  song: 'song',
  editor: 'editor',
};

export default function App() {
  const [songs, setSongs] = useState(() => loadSongs());
  const [view, setView] = useState(VIEWS.categories);
  const [categoryId, setCategoryId] = useState('');
  const [momentId, setMomentId] = useState('');
  const [currentSongId, setCurrentSongId] = useState(null);
  const [editingSongId, setEditingSongId] = useState(null);

  const persist = useCallback((nextSongs) => {
    setSongs(nextSongs);
    saveSongs(nextSongs);
  }, []);

  function goHome() {
    setView(VIEWS.categories);
    setCategoryId('');
    setMomentId('');
    setCurrentSongId(null);
    setEditingSongId(null);
  }

  function handleSelectCategory(id) {
    setCategoryId(id);
    const category = getCategoryById(id);
    if (category?.hasMoments) {
      setView(VIEWS.moments);
    } else {
      setMomentId('');
      setView(VIEWS.songs);
    }
  }

  function handleSelectMoment(id) {
    setMomentId(id);
    setView(VIEWS.songs);
  }

  function handleSelectSong(id) {
    setCurrentSongId(id);
    setView(VIEWS.song);
  }

  function handleQuickSelectSong(id) {
    setCategoryId('');
    setMomentId('');
    setCurrentSongId(id);
    setView(VIEWS.song);
  }

  function handleNewSong() {
    setEditingSongId(null);
    setView(VIEWS.editor);
  }

  function handleEditSong(id) {
    setEditingSongId(id);
    setView(VIEWS.editor);
  }

  function handleSaveSong(data) {
    if (editingSongId) {
      const next = songs.map((s) =>
        s.id === editingSongId ? { ...s, ...data } : s
      );
      persist(next);
      setCurrentSongId(editingSongId);
      setCategoryId(data.categoryId);
      setMomentId(data.momentId || '');
      setView(VIEWS.song);
      return;
    }

    const newSong = { id: createId(), ...data };
    persist([...songs, newSong]);
    setCurrentSongId(newSong.id);
    setCategoryId(data.categoryId);
    setMomentId(data.momentId || '');
    setView(VIEWS.song);
  }

  function handleDeleteSong(id) {
    persist(songs.filter((s) => s.id !== id));
    setCurrentSongId(null);
    if (categoryId) {
      const category = getCategoryById(categoryId);
      setView(category?.hasMoments && momentId ? VIEWS.songs : category?.hasMoments ? VIEWS.moments : VIEWS.songs);
    } else {
      setView(VIEWS.categories);
    }
  }

  function handleBackFromSongs() {
    const category = getCategoryById(categoryId);
    if (category?.hasMoments) {
      setView(VIEWS.moments);
      setMomentId('');
    } else {
      goHome();
    }
  }

  function handleBackFromSong() {
    if (categoryId) {
      setView(VIEWS.songs);
    } else {
      goHome();
    }
  }

  function handleCancelEdit() {
    if (editingSongId || currentSongId) {
      if (currentSongId) {
        setView(VIEWS.song);
      } else if (categoryId) {
        handleBackFromSongs();
      } else {
        goHome();
      }
    } else {
      goHome();
    }
    setEditingSongId(null);
  }

  const currentSong = songs.find((s) => s.id === currentSongId);
  const editingSong = songs.find((s) => s.id === editingSongId);

  return (
    <>
      <Header onHome={goHome} onNewSong={handleNewSong} />
      <main className="main">
        {view === VIEWS.categories && (
          <CategoryView
            songs={songs}
            onSelectCategory={handleSelectCategory}
            onSelectSong={handleQuickSelectSong}
          />
        )}

        {view === VIEWS.moments && (
          <MomentView
            categoryId={categoryId}
            songs={songs}
            onBack={goHome}
            onSelectMoment={handleSelectMoment}
          />
        )}

        {view === VIEWS.songs && (
          <SongListView
            categoryId={categoryId}
            momentId={momentId}
            songs={songs}
            onBack={handleBackFromSongs}
            onSelectSong={handleSelectSong}
          />
        )}

        {view === VIEWS.song && currentSong && (
          <SongView
            song={currentSong}
            onBack={handleBackFromSong}
            onEdit={handleEditSong}
            onDelete={handleDeleteSong}
          />
        )}

        {view === VIEWS.editor && (
          <SongEditor
            song={editingSong}
            defaultCategoryId={categoryId}
            defaultMomentId={momentId}
            onCancel={handleCancelEdit}
            onSave={handleSaveSong}
          />
        )}
      </main>
      <footer className="footer">
        <p>Movimiento Consolación para el Mundo · Coro MCM</p>
        <p className="footer-note">Cantemos con alegría, desde el corazón.</p>
      </footer>
    </>
  );
}
