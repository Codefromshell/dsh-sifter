window.__ModuleLoader__.load({
  id: 'dsh-sifter',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const NS = 'sifter'
    const EMPTY_MAP = new Map()
    const EMPTY_SESSIONS = { ids: [], byId: {}, phase: 'ready' }
    const EMPTY_WORKSPACES = {
      items: [],
      archivedSessionIds: [],
      pinnedSessionIds: [],
      phase: 'ready',
    }

    const en = {
      'panel.badge': 'Preview',
      'panel.title': 'Sifter',
      'panel.subtitle': 'Pick chats. Archive in bulk. Undo anytime.',
      'list.count': '{n} chats',
      'list.archivedHidden': '{n} archived hidden',
      'list.loading': 'Loading chats…',
      'list.empty': 'No chats yet.',
      'list.ungrouped': 'Ungrouped',
      'list.untitledWorkspace': 'Untitled workspace',
      'list.folder': '{n} chats',
      'view.grouped': 'Folders',
      'view.flat': 'Flat list',
      'view.collapseAll': 'Collapse all',
      'view.expandAll': 'Expand all',
      'view.allChats': 'All chats',
      'select.sidebarHint': 'Checkboxes appear on idle chats in the native sidebar.',
      'select.panelTitle': 'Selection',
      'time.justNow': 'just now',
      'time.minutes': '{n}m ago',
      'time.hours': '{n}h ago',
      'time.days': '{n}d ago',
      'status.running': 'Running',
      'status.waiting': 'Waiting',
      'status.completed': 'Done',
      'status.idle': 'Idle',
      'select.enable': 'Show checkboxes',
      'select.cancel': 'Cancel selection',
      'select.none': 'No chats selected',
      'select.count': '{n} selected',
      'select.all': 'Select all',
      'select.clear': 'Clear',
      'select.archive': 'Archive selected',
      'select.toggleRow': 'Select chat',
      'archive.running': 'Archiving {done} of {total}…',
      'archive.done': '{n} chats archived',
      'archive.failed': '{n} failed',
      'archive.retryFailed': 'Retry failed',
      'archive.active': '{n} chats are still running.',
      'archive.activeBody':
        'Archiving stops the running work. Restoring the chat does not resume it.',
      'archive.stopAndArchive': 'Stop and archive',
      'archive.cancel': 'Cancel',
      'archive.undo': 'Undo',
      'archive.undoing': 'Restoring chats…',
      'archive.undone': '{n} chats restored',
      'archive.undoFailed': '{n} could not be restored',
      'archive.noSelection': 'Select at least one chat.',
    }

    const tr = {
      'panel.badge': 'Önizleme',
      'panel.title': 'Sifter',
      'panel.subtitle': 'Sohbetleri seç, tek hamlede arşivle, istediğinde geri al.',
      'list.count': '{n} sohbet',
      'list.archivedHidden': '{n} arşivli gizli',
      'list.loading': 'Sohbetler yükleniyor…',
      'list.empty': 'Henüz sohbet yok.',
      'list.ungrouped': 'Grupsuz',
      'list.untitledWorkspace': 'Adsız çalışma alanı',
      'list.folder': '{n} sohbet',
      'view.grouped': 'Klasörler',
      'view.flat': 'Düz liste',
      'view.collapseAll': 'Tümünü kapat',
      'view.expandAll': 'Tümünü aç',
      'view.allChats': 'Tüm sohbetler',
      'select.sidebarHint': 'Kutular native kenar çubuğunda, boşta sohbetlerde görünür.',
      'select.panelTitle': 'Seçim',
      'time.justNow': 'az önce',
      'time.minutes': '{n} dk önce',
      'time.hours': '{n} sa önce',
      'time.days': '{n} gün önce',
      'status.running': 'Çalışıyor',
      'status.waiting': 'Bekliyor',
      'status.completed': 'Bitti',
      'status.idle': 'Boşta',
      'select.enable': 'Kutuları göster',
      'select.cancel': 'Seçimi bitir',
      'select.none': 'Seçim yok',
      'select.count': '{n} seçili',
      'select.all': 'Tümünü seç',
      'select.clear': 'Temizle',
      'select.archive': 'Seçilenleri arşivle',
      'select.toggleRow': 'Sohbeti seç',
      'archive.running': '{done} / {total} arşivleniyor…',
      'archive.done': '{n} sohbet arşivlendi',
      'archive.failed': '{n} başarısız',
      'archive.retryFailed': 'Başarısızları dene',
      'archive.active': '{n} sohbet hâlâ çalışıyor.',
      'archive.activeBody':
        'Arşivlemek çalışan işi durdurur. Sohbeti geri almak işi yeniden başlatmaz.',
      'archive.stopAndArchive': 'Durdur ve arşivle',
      'archive.cancel': 'Vazgeç',
      'archive.undo': 'Geri al',
      'archive.undoing': 'Sohbetler geri getiriliyor…',
      'archive.undone': '{n} sohbet geri getirildi',
      'archive.undoFailed': '{n} sohbet geri getirilemedi',
      'archive.noSelection': 'En az bir sohbet seç.',
    }

    const styles = {
      root: {
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box',
        padding: '28px 32px 40px',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        background: 'var(--dsw-alias-bg-base)',
        color: 'var(--dsw-alias-label-primary)',
        fontFamily: 'var(--dsw-font-family)',
      },
      header: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '24px',
        marginBottom: '16px',
      },
      heading: { minWidth: 0 },
      badge: {
        display: 'inline-block',
        marginBottom: '10px',
        padding: '2px 8px',
        borderRadius: '999px',
        background: 'var(--dsw-alias-state-business-tertiary)',
        color: 'var(--dsw-alias-state-business-primary)',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '18px',
      },
      title: { margin: 0, fontSize: '22px', fontWeight: 600, lineHeight: '30px' },
      subtitle: {
        margin: '6px 0 0',
        color: 'var(--dsw-alias-label-secondary)',
        fontSize: '14px',
        lineHeight: '22px',
      },
      counter: {
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '4px',
        paddingTop: '4px',
        color: 'var(--dsw-alias-label-secondary)',
        fontSize: '13px',
        lineHeight: '20px',
        whiteSpace: 'nowrap',
      },
      counterMuted: {
        color: 'var(--dsw-alias-label-tertiary)',
        fontSize: '12px',
        lineHeight: '18px',
      },
      content: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 300px',
        alignItems: 'start',
        gap: '24px',
      },
      mainColumn: { minWidth: 0 },
      sideColumn: {
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      },
      viewBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        flexWrap: 'wrap',
        marginBottom: '12px',
      },
      segment: {
        padding: '5px 10px',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderRadius: 'var(--dsw-radius-sm)',
        background: 'transparent',
        color: 'var(--dsw-alias-label-tertiary)',
        font: 'inherit',
        fontSize: '12px',
        lineHeight: '18px',
        cursor: 'pointer',
      },
      segmentActive: {
        background: 'var(--dsw-alias-bg-layer-2)',
        color: 'var(--dsw-alias-label-primary)',
      },
      railCard: {
        padding: '16px',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderRadius: 'var(--dsw-radius-md)',
        background: 'var(--dsw-alias-bg-layer-1)',
      },
      railTitle: {
        marginBottom: '6px',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: '20px',
      },
      railHint: {
        marginTop: '10px',
        color: 'var(--dsw-alias-label-tertiary)',
        fontSize: '12px',
        lineHeight: '18px',
      },
      railActions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '8px',
        marginTop: '12px',
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
        marginBottom: '16px',
      },
      selectionCount: {
        color: 'var(--dsw-alias-label-secondary)',
        fontSize: '13px',
        lineHeight: '20px',
      },
      actions: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' },
      button: {
        padding: '6px 10px',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderRadius: 'var(--dsw-radius-sm)',
        background: 'var(--dsw-alias-bg-layer-1)',
        color: 'var(--dsw-alias-label-secondary)',
        font: 'inherit',
        fontSize: '12px',
        lineHeight: '18px',
        cursor: 'pointer',
      },
      buttonPrimary: {
        borderColor: 'var(--dsw-alias-state-business-primary)',
        background: 'var(--dsw-alias-state-business-primary)',
        color: 'var(--dsw-alias-label-primary-foreground)',
      },
      buttonDisabled: { opacity: 0.45, cursor: 'default' },
      group: { marginBottom: '16px' },
      groupHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        boxSizing: 'border-box',
        padding: '8px 12px',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderBottom: 'none',
        borderRadius: 'var(--dsw-radius-md) var(--dsw-radius-md) 0 0',
        background: 'var(--dsw-alias-bg-layer-2)',
        color: 'var(--dsw-alias-label-secondary)',
        font: 'inherit',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: '20px',
        textAlign: 'left',
        cursor: 'pointer',
      },
      groupTitle: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      groupCount: {
        marginLeft: 'auto',
        color: 'var(--dsw-alias-label-tertiary)',
        fontSize: '12px',
        fontWeight: 400,
      },
      list: {
        overflow: 'hidden',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderRadius: '0 0 var(--dsw-radius-md) var(--dsw-radius-md)',
        background: 'var(--dsw-alias-bg-layer-1)',
      },
      flatList: {
        overflow: 'hidden',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderRadius: 'var(--dsw-radius-md)',
        background: 'var(--dsw-alias-bg-layer-1)',
      },
      row: {
        display: 'grid',
        gridTemplateColumns: '24px minmax(0, 1fr) 110px 92px',
        alignItems: 'center',
        gap: '12px',
        minHeight: '52px',
        padding: '8px 12px',
        borderBottom: '1px solid var(--dsw-alias-border-l1)',
        boxSizing: 'border-box',
        cursor: 'pointer',
      },
      rowLast: { borderBottom: 'none' },
      rowSelected: {
        background: 'var(--dsw-alias-interactive-bg-active)',
      },
      checkbox: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '16px',
        height: '16px',
        padding: 0,
        border: '1px solid var(--dsw-alias-border-l3)',
        borderRadius: '4px',
        background: 'var(--dsw-alias-bg-base)',
        color: 'var(--dsw-alias-label-primary-foreground)',
        font: 'inherit',
        fontSize: '11px',
        lineHeight: '1',
        cursor: 'pointer',
      },
      checkboxChecked: {
        borderColor: 'var(--dsw-alias-state-business-primary)',
        background: 'var(--dsw-alias-state-business-primary)',
      },
      rowMain: { minWidth: 0 },
      rowTitle: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '22px',
      },
      rowMeta: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'var(--dsw-alias-label-tertiary)',
        fontSize: '12px',
        lineHeight: '18px',
      },
      rowTime: {
        color: 'var(--dsw-alias-label-tertiary)',
        fontSize: '12px',
        lineHeight: '18px',
        whiteSpace: 'nowrap',
      },
      rowStatus: {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '18px',
        whiteSpace: 'nowrap',
      },
      empty: {
        padding: '48px 24px',
        textAlign: 'center',
        border: '1px dashed var(--dsw-alias-border-l2)',
        borderRadius: 'var(--dsw-radius-md)',
        color: 'var(--dsw-alias-label-tertiary)',
        fontSize: '13px',
        lineHeight: '20px',
      },
      notice: {
        marginBottom: '16px',
        padding: '12px 16px',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderRadius: 'var(--dsw-radius-md)',
        background: 'var(--dsw-alias-bg-layer-1)',
        color: 'var(--dsw-alias-label-secondary)',
        fontSize: '13px',
        lineHeight: '20px',
      },
      noticeWarning: {
        borderColor: 'var(--dsw-alias-state-warn-primary)',
        background: 'var(--dsw-alias-state-warn-tertiary)',
        color: 'var(--dsw-alias-state-warn-label)',
      },
      noticeTitle: { fontWeight: 600, marginBottom: '4px' },
      noticeBody: { color: 'var(--dsw-alias-label-secondary)' },
      noticeActions: { display: 'flex', gap: '8px', marginTop: '8px' },
      failure: {
        marginTop: '6px',
        color: 'var(--dsw-alias-state-error-primary)',
        fontSize: '12px',
        lineHeight: '18px',
      },
      statusColors: {
        running: 'var(--dsw-alias-state-business-primary)',
        waiting: 'var(--dsw-alias-state-warn-primary)',
        completed: 'var(--dsw-alias-state-success-primary)',
        idle: 'var(--dsw-alias-label-tertiary)',
      },
    }

    function interpolate(text, params) {
      return String(text).replace(/\{(\w+)\}/g, (_match, name) =>
        params && params[name] != null ? String(params[name]) : '',
      )
    }

    function translate(props, key, params) {
      if (typeof props.t === 'function') {
        try {
          return props.t(key, params)
        } catch (_error) {
          // Fall through to the bundled English dictionary.
        }
      }
      return interpolate(en[key] ?? key, params)
    }

    function makeStoreHook(store) {
      return function useStoreSnapshot(selector) {
        const subscribe = React.useCallback(
          (listener) =>
            store && typeof store.subscribe === 'function'
              ? store.subscribe(listener)
              : () => {},
          [store],
        )
        const getSnapshot = React.useCallback(
          () =>
            store && typeof store.getSnapshot === 'function'
              ? store.getSnapshot()
              : undefined,
          [store],
        )
        const snapshot = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
        return typeof selector === 'function' ? selector(snapshot) : snapshot
      }
    }

    function createSelectionStore() {
      let state = { mode: 'browse', ids: new Set(), anchor: null }
      const listeners = new Set()
      const emit = () => listeners.forEach((listener) => listener())
      const set = (next) => {
        state = next
        emit()
      }

      function toggle(sessionId) {
        const ids = new Set(state.ids)
        const had = ids.has(sessionId)
        if (had) ids.delete(sessionId)
        else ids.add(sessionId)
        set({
          ...state,
          mode: 'select',
          ids,
          anchor: had ? state.anchor : sessionId,
        })
      }

      function selectRange(visibleIds, sessionId) {
        const from = visibleIds.indexOf(state.anchor)
        const to = visibleIds.indexOf(sessionId)
        if (from === -1 || to === -1) {
          toggle(sessionId)
          return
        }
        const [start, end] = from < to ? [from, to] : [to, from]
        const ids = new Set(state.ids)
        for (const id of visibleIds.slice(start, end + 1)) ids.add(id)
        set({ ...state, mode: 'select', ids, anchor: sessionId })
      }

      return {
        getSnapshot: () => state,
        subscribe(listener) {
          listeners.add(listener)
          return () => listeners.delete(listener)
        },
        toggle,
        selectRange,
        selectVisible(ids) {
          set({ ...state, mode: 'select', ids: new Set(ids), anchor: null })
        },
        remove(idsToRemove) {
          const ids = new Set(state.ids)
          for (const id of idsToRemove) ids.delete(id)
          set({ ...state, ids })
        },
        clear() {
          set({ mode: 'browse', ids: new Set(), anchor: null })
        },
        setMode(mode) {
          set({ ...state, mode })
        },
      }
    }

    function statusFor(statuses, sessionId) {
      if (statuses == null) return undefined
      if (typeof statuses.get === 'function') return statuses.get(sessionId)
      return statuses[sessionId]
    }

    function collectGroups(sessions, workspaces, statuses, t) {
      const archived = new Set(workspaces.archivedSessionIds ?? [])
      const seen = new Set()

      function rowFor(sessionId) {
        const summary = sessions.byId?.[sessionId]
        if (summary === undefined) return undefined
        if (summary.origin === 'subagent') return undefined
        if (archived.has(sessionId)) return undefined

        const status = statusFor(statuses, sessionId)
        seen.add(sessionId)
        return {
          id: sessionId,
          title: summary.displayTitle || summary.title || sessionId,
          updatedAt: summary.updatedAt ?? 0,
          running: summary.running === true || status?.running === true,
          waiting: status?.pendingInteraction != null,
          completed: status?.completionUnread === true,
        }
      }

      const groups = []
      for (const workspace of workspaces.items ?? []) {
        const rows = []
        for (const sessionId of workspace.sessionIds ?? []) {
          if (seen.has(sessionId)) continue
          const row = rowFor(sessionId)
          if (row !== undefined) {
            row.workspace = workspace.title || t('list.untitledWorkspace')
            rows.push(row)
          }
        }
        if (rows.length > 0) {
          groups.push({
            key: workspace.workspaceId,
            title: workspace.title || t('list.untitledWorkspace'),
            rows,
          })
        }
      }

      const ungrouped = []
      for (const sessionId of sessions.ids ?? []) {
        if (seen.has(sessionId)) continue
        const row = rowFor(sessionId)
        if (row !== undefined) ungrouped.push(row)
      }
      if (ungrouped.length > 0) {
        groups.push({ key: '__ungrouped', title: t('list.ungrouped'), rows: ungrouped })
      }

      return groups
    }

    function formatRelativeTime(value, t) {
      const timestamp = typeof value === 'number' ? value : Date.parse(value)
      if (!timestamp) return ''

      const diff = Date.now() - timestamp
      const minute = 60 * 1000
      const hour = 60 * minute
      const day = 24 * hour

      if (diff < minute) return t('time.justNow')
      if (diff < hour) return t('time.minutes', { n: Math.floor(diff / minute) })
      if (diff < day) return t('time.hours', { n: Math.floor(diff / hour) })
      if (diff < 7 * day) return t('time.days', { n: Math.floor(diff / day) })

      return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
        new Date(timestamp),
      )
    }

    function rowStatus(row, t) {
      if (row.waiting) return { state: 'waiting', label: t('status.waiting') }
      if (row.running) return { state: 'running', label: t('status.running') }
      if (row.completed) return { state: 'completed', label: t('status.completed') }
      return { state: 'idle', label: t('status.idle') }
    }

    function classifyArchiveError(error) {
      if (error?.name === 'WorkspaceArchiveError') {
        return {
          code: error.rpcError?.code ?? 'unknown',
          message: error.rpcError?.message ?? String(error?.message ?? error),
        }
      }
      return {
        code: 'unknown',
        message: String(error?.message ?? error),
      }
    }

    function SifterIcon({ size = 16 }) {
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          'aria-hidden': true,
          focusable: 'false',
        },
        h('rect', { x: 3, y: 4, width: 12, height: 2.5, rx: 1.25, fill: 'currentColor' }),
        h('rect', { x: 3, y: 9.25, width: 15, height: 2.5, rx: 1.25, fill: 'currentColor', opacity: 0.78 }),
        h('rect', { x: 3, y: 14.5, width: 9, height: 2.5, rx: 1.25, fill: 'currentColor', opacity: 0.52 }),
        h('circle', { cx: 17.5, cy: 17, r: 4.25, stroke: 'currentColor', strokeWidth: 1.6 }),
        h('path', {
          d: 'M15.6 17.1l1.35 1.35 2.65-2.8',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      )
    }

    function FolderIcon() {
      return h(
        'svg',
        {
          width: 14,
          height: 14,
          viewBox: '0 0 24 24',
          fill: 'none',
          'aria-hidden': true,
          focusable: 'false',
        },
        h('path', {
          d: 'M3 7.5A1.5 1.5 0 0 1 4.5 6h4l2 2h9A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-10Z',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinejoin: 'round',
        }),
      )
    }

    function ChevronIcon({ collapsed }) {
      return h(
        'svg',
        {
          width: 12,
          height: 12,
          viewBox: '0 0 24 24',
          fill: 'none',
          'aria-hidden': true,
          focusable: 'false',
          style: {
            flex: '0 0 auto',
            transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
            transition: 'transform 120ms ease',
          },
        },
        h('path', {
          d: 'M7 10l5 5 5-5',
          stroke: 'currentColor',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      )
    }

    function SessionSelectBox(props) {
      const selection = props.selection
      if (selection === undefined) return null

      const state = React.useSyncExternalStore(
        selection.subscribe,
        selection.getSnapshot,
      )
      if (state.mode !== 'select') return null

      const checked = state.ids.has(props.sessionId)
      const t = (key) => translate(props, key)
      const label = t('select.toggleRow')

      return h(
        'button',
        {
          type: 'button',
          role: 'checkbox',
          'aria-checked': checked,
          'aria-label': label,
          title: label,
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '16px',
            height: '16px',
            padding: 0,
            border: '1px solid var(--dsw-alias-border-l3)',
            borderRadius: '4px',
            background: checked
              ? 'var(--dsw-alias-state-business-primary)'
              : 'var(--dsw-alias-bg-base)',
            color: 'var(--dsw-alias-label-primary-foreground)',
            font: 'inherit',
            fontSize: '11px',
            lineHeight: '1',
            cursor: 'pointer',
          },
          onClick: (event) => {
            event.preventDefault()
            event.stopPropagation()
            selection.toggle(props.sessionId)
          },
          onMouseDown: (event) => event.stopPropagation(),
        },
        checked ? '✓' : null,
      )
    }

    function Panel(props) {
      const t = (key, params) => translate(props, key, params)
      const useSessions =
        typeof props.useSessions === 'function'
          ? props.useSessions
          : makeStoreHook(props.sessionsStore)
      const useWorkspaces =
        typeof props.useWorkspaces === 'function'
          ? props.useWorkspaces
          : makeStoreHook(props.workspacesStore)
      const useSessionStatus =
        typeof props.useSessionStatus === 'function'
          ? props.useSessionStatus
          : () => EMPTY_MAP

      const sessions = useSessions((state) => state) ?? EMPTY_SESSIONS
      const workspaces = useWorkspaces((state) => state) ?? EMPTY_WORKSPACES
      const statuses = useSessionStatus((state) => state) ?? EMPTY_MAP
      const selectionState = React.useSyncExternalStore(
        props.selection.subscribe,
        props.selection.getSnapshot,
      )

      const groups = React.useMemo(
        () => collectGroups(sessions, workspaces, statuses, t),
        [sessions, workspaces, statuses, t],
      )
      const allIds = React.useMemo(
        () => groups.flatMap((group) => group.rows.map((row) => row.id)),
        [groups],
      )
      const selectedCount = selectionState.ids.size
      const archivedCount = (workspaces.archivedSessionIds ?? []).length
      const loading = sessions.phase === 'pending' && allIds.length === 0

      const [run, setRun] = React.useState(null)
      const [undo, setUndo] = React.useState(null)
      const [lastArchived, setLastArchived] = React.useState([])
      const [viewMode, setViewMode] = React.useState('grouped')
      const [collapsed, setCollapsed] = React.useState(new Set())

      const flatRows = React.useMemo(
        () => groups.flatMap((group) => group.rows),
        [groups],
      )
      const allCollapsed =
        groups.length > 0 && groups.every((group) => collapsed.has(group.key))

      function toggleGroup(key) {
        setCollapsed((current) => {
          const next = new Set(current)
          if (next.has(key)) next.delete(key)
          else next.add(key)
          return next
        })
      }

      function toggleAllGroups() {
        setCollapsed(allCollapsed ? new Set() : new Set(groups.map((group) => group.key)))
      }

      const titleFor = (sessionId) =>
        sessions.byId?.[sessionId]?.displayTitle ??
        sessions.byId?.[sessionId]?.title ??
        sessionId

      async function archiveMany(ids, stopActivity) {
        setUndo(null)
        setRun({
          phase: 'running',
          total: ids.length,
          done: 0,
          currentId: null,
          results: [],
          stopActivity,
        })

        const results = []
        for (const sessionId of ids) {
          setRun((current) =>
            current === null
              ? current
              : { ...current, currentId: sessionId, done: results.length },
          )
          try {
            const service =
              props.uiWorkspace?.archiveSession !== undefined
                ? props.uiWorkspace
                : props.workspaceService
            await service.archiveSession(
              sessionId,
              stopActivity ? { stopActivity: true } : {},
            )
            results.push({ id: sessionId, ok: true })
          } catch (error) {
            results.push({ id: sessionId, ok: false, ...classifyArchiveError(error) })
          }
          setRun({
            phase: 'running',
            total: ids.length,
            done: results.length,
            currentId: sessionId,
            results: [...results],
            stopActivity,
          })
        }

        const archived = results.filter((result) => result.ok).map((result) => result.id)
        const active = results
          .filter(
            (result) => !result.ok && result.code === 'workspace/session-active',
          )
          .map((result) => result.id)

        setRun({
          phase: 'done',
          total: ids.length,
          done: ids.length,
          currentId: null,
          results,
          stopActivity,
          archived,
          active,
        })
        props.selection.remove(archived)
        if (active.length > 0) {
          props.selection.setMode('select')
        } else {
          props.selection.clear()
        }
        if (archived.length > 0) {
          setLastArchived((current) => [...new Set([...current, ...archived])])
        }
      }

      async function undoArchive() {
        const ids = lastArchived
        if (ids.length === 0) return
        setRun(null)
        setUndo({ phase: 'running', total: ids.length, done: 0, results: [] })

        const results = []
        for (const sessionId of ids) {
          try {
            await props.workspaceService.unarchiveSession(sessionId)
            results.push({ id: sessionId, ok: true })
          } catch (error) {
            results.push({ id: sessionId, ok: false, message: String(error?.message ?? error) })
          }
          setUndo({
            phase: 'running',
            total: ids.length,
            done: results.length,
            results: [...results],
          })
        }

        const restored = results.filter((result) => result.ok).length
        setUndo({
          phase: 'done',
          total: ids.length,
          restored,
          failed: ids.length - restored,
          results,
        })
        setLastArchived([])
      }

      function handleRowToggle(sessionId, event) {
        if (event.shiftKey) props.selection.selectRange(allIds, sessionId)
        else props.selection.toggle(sessionId)
      }

      function renderNotice() {
        if (run === null && undo === null) return null

        if (run !== null && run.phase === 'running') {
          return h(
            'div',
            { style: styles.notice, role: 'status' },
            t('archive.running', { done: run.done, total: run.total }),
          )
        }

        if (run !== null && run.phase === 'done') {
          const failures = run.results.filter((result) => !result.ok)
          const retryable = failures
            .filter((failure) => failure.code !== 'workspace/session-active')
            .map((failure) => failure.id)
          const active = run.active ?? []
          const archived = run.archived ?? []
          return h(
            'div',
            { style: styles.notice },
            h(
              'div',
              { style: styles.noticeTitle },
              t('archive.done', { n: archived.length }),
            ),
            failures.length > 0
              ? h(
                  'div',
                  { style: styles.failure },
                  t('archive.failed', { n: failures.length }),
                )
              : null,
            failures.slice(0, 5).map((failure) =>
              h(
                'div',
                { key: failure.id, style: styles.failure },
                `${titleFor(failure.id)} — ${failure.code}`,
              ),
            ),
            retryable.length > 0
              ? h(
                  'div',
                  { style: styles.noticeActions },
                  h(
                    'button',
                    {
                      type: 'button',
                      style: styles.button,
                      onClick: () => archiveMany(retryable, false),
                    },
                    t('archive.retryFailed'),
                  ),
                )
              : null,
            active.length > 0 && run.stopActivity !== true
              ? h(
                  'div',
                  { style: { ...styles.notice, ...styles.noticeWarning } },
                  h('div', { style: styles.noticeTitle }, t('archive.active', { n: active.length })),
                  h('div', { style: styles.noticeBody }, t('archive.activeBody')),
                  h(
                    'div',
                    { style: styles.noticeActions },
                    h(
                      'button',
                      {
                        type: 'button',
                        style: { ...styles.button, ...styles.buttonPrimary },
                        onClick: () => archiveMany(active, true),
                      },
                      t('archive.stopAndArchive'),
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        style: styles.button,
                        onClick: () => setRun({ ...run, active: [] }),
                      },
                      t('archive.cancel'),
                    ),
                  ),
                )
              : null,
            archived.length > 0
              ? h(
                  'div',
                  { style: styles.noticeActions },
                  h(
                    'button',
                    {
                      type: 'button',
                      style: styles.button,
                      disabled: undo !== null && undo.phase === 'running',
                      onClick: undoArchive,
                    },
                    `${t('archive.undo')} (${lastArchived.length})`,
                  ),
                )
              : null,
          )
        }

        if (undo !== null) {
          return h(
            'div',
            { style: styles.notice, role: 'status' },
            undo.phase === 'running'
              ? t('archive.undoing')
              : `${t('archive.undone', { n: undo.restored })}${
                  undo.failed > 0
                    ? ` · ${t('archive.undoFailed', { n: undo.failed })}`
                    : ''
                }`,
          )
        }

        return null
      }

      const canArchive = selectedCount > 0 && (run === null || run.phase !== 'running')
      const railButton = { ...styles.button, width: '100%', textAlign: 'center' }

      function renderRow(row, index, total) {
        const status = rowStatus(row, t)
        const time = formatRelativeTime(row.updatedAt, t)
        const selected = selectionState.ids.has(row.id)
        return h(
          'div',
          {
            key: row.id,
            role: 'option',
            'aria-selected': selected,
            tabIndex: 0,
            style: {
              ...styles.row,
              ...(selected ? styles.rowSelected : {}),
              ...(index === total - 1 ? styles.rowLast : {}),
            },
            onClick: (event) => handleRowToggle(row.id, event),
            onKeyDown: (event) => {
              if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault()
                handleRowToggle(row.id, event)
              }
            },
          },
          h(
            'button',
            {
              type: 'button',
              role: 'checkbox',
              'aria-checked': selected,
              style: {
                ...styles.checkbox,
                ...(selected ? styles.checkboxChecked : {}),
              },
              onClick: (event) => {
                event.stopPropagation()
                handleRowToggle(row.id, event)
              },
              onMouseDown: (event) => event.stopPropagation(),
            },
            selected ? '✓' : null,
          ),
          h(
            'div',
            { style: styles.rowMain },
            h('div', { style: styles.rowTitle }, row.title),
            h('div', { style: styles.rowMeta }, row.workspace ?? t('list.ungrouped')),
          ),
          h('div', { style: styles.rowTime }, time),
          h(
            'div',
            {
              style: {
                ...styles.rowStatus,
                color: styles.statusColors[status.state],
              },
            },
            status.label,
          ),
        )
      }

      function renderGroup(group) {
        const isCollapsed = collapsed.has(group.key)
        return h(
          'section',
          { key: group.key, style: styles.group },
          h(
            'button',
            {
              type: 'button',
              style: {
                ...styles.groupHeader,
                ...(isCollapsed
                  ? {
                      borderBottom: '1px solid var(--dsw-alias-border-l2)',
                      borderRadius: 'var(--dsw-radius-md)',
                    }
                  : {}),
              },
              'aria-expanded': !isCollapsed,
              onClick: () => toggleGroup(group.key),
            },
            h(ChevronIcon, { collapsed: isCollapsed }),
            h(FolderIcon, null),
            h('span', { style: styles.groupTitle }, group.title),
            h(
              'span',
              { style: styles.groupCount },
              t('list.folder', { n: group.rows.length }),
            ),
          ),
          isCollapsed
            ? null
            : h(
                'div',
                {
                  style: styles.list,
                  role: 'listbox',
                  'aria-multiselectable': 'true',
                  'aria-label': group.title,
                },
                group.rows.map((row, index) =>
                  renderRow(row, index, group.rows.length),
                ),
              ),
        )
      }

      let listContent = null
      if (loading) {
        listContent = h('div', { style: styles.empty, role: 'status' }, t('list.loading'))
      } else if (groups.length === 0) {
        listContent = h('div', { style: styles.empty, role: 'status' }, t('list.empty'))
      } else if (viewMode === 'flat') {
        listContent = h(
          'div',
          {
            style: styles.flatList,
            role: 'listbox',
            'aria-multiselectable': 'true',
            'aria-label': t('view.allChats'),
          },
          flatRows.map((row, index) => renderRow(row, index, flatRows.length)),
        )
      } else {
        listContent = groups.map((group) => renderGroup(group))
      }

      return h(
        'div',
        { style: styles.root },
        h(
          'div',
          { style: styles.header },
          h(
            'div',
            { style: styles.heading },
            h('span', { style: styles.badge }, t('panel.badge')),
            h('h1', { style: styles.title }, t('panel.title')),
            h('p', { style: styles.subtitle }, t('panel.subtitle')),
          ),
          h(
            'div',
            { style: styles.counter },
            h('span', null, t('list.count', { n: allIds.length })),
            archivedCount > 0
              ? h(
                  'span',
                  { style: styles.counterMuted },
                  t('list.archivedHidden', { n: archivedCount }),
                )
              : null,
          ),
        ),
        h(
          'div',
          { style: styles.content },
          h(
            'div',
            { style: styles.mainColumn },
            h(
              'div',
              { style: styles.viewBar },
              h(
                'button',
                {
                  type: 'button',
                  style: {
                    ...styles.segment,
                    ...(viewMode === 'grouped' ? styles.segmentActive : {}),
                  },
                  onClick: () => setViewMode('grouped'),
                },
                t('view.grouped'),
              ),
              h(
                'button',
                {
                  type: 'button',
                  style: {
                    ...styles.segment,
                    ...(viewMode === 'flat' ? styles.segmentActive : {}),
                  },
                  onClick: () => setViewMode('flat'),
                },
                t('view.flat'),
              ),
              viewMode === 'grouped' && groups.length > 0
                ? h(
                    'button',
                    { type: 'button', style: styles.segment, onClick: toggleAllGroups },
                    allCollapsed ? t('view.expandAll') : t('view.collapseAll'),
                  )
                : null,
            ),
            listContent,
          ),
          h(
            'aside',
            { style: styles.sideColumn },
            h(
              'div',
              { style: styles.railCard },
              h('div', { style: styles.railTitle }, t('select.panelTitle')),
              h(
                'div',
                { style: styles.selectionCount },
                selectedCount > 0
                  ? t('select.count', { n: selectedCount })
                  : t('select.none'),
              ),
              h(
                'div',
                { style: styles.railActions },
                h(
                  'button',
                  {
                    type: 'button',
                    style: railButton,
                    onClick: () =>
                      selectionState.mode === 'select'
                        ? props.selection.clear()
                        : props.selection.setMode('select'),
                  },
                  selectionState.mode === 'select'
                    ? t('select.cancel')
                    : t('select.enable'),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    style: railButton,
                    disabled: allIds.length === 0,
                    onClick: () => props.selection.selectVisible(allIds),
                  },
                  t('select.all'),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    style: railButton,
                    disabled: selectedCount === 0,
                    onClick: () => props.selection.clear(),
                  },
                  t('select.clear'),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    style: {
                      ...railButton,
                      ...styles.buttonPrimary,
                      ...(canArchive ? {} : styles.buttonDisabled),
                    },
                    disabled: !canArchive,
                    onClick: () => archiveMany([...selectionState.ids], false),
                  },
                  t('select.archive'),
                ),
              ),
              h('div', { style: styles.railHint }, t('select.sidebarHint')),
            ),
            renderNotice(),
          ),
        ),
      )
    }

    const inject = ['slots', 'sessions', 'workspaces', 'locale']

    function apply(ctx) {
      const sessions = ctx.get('sessions')
      const workspaces = ctx.get('workspaces')
      const uiWorkspace = ctx.get('uiWorkspace')

      if (!sessions?.list || !workspaces?.list) {
        console.warn('[sifter] required DSH services are missing; plugin disabled')
        return
      }

      const t = ctx.locale.bind(NS)
      const selection = createSelectionStore()

      ctx.effect(() => ctx.locale.register(NS, 'en', en), 'sifter: en dictionary')

      ctx.effect(() => {
        let removeLanguage = () => {}
        try {
          removeLanguage = ctx.locale.addLanguage({
            id: 'tr',
            label: 'Türkçe',
            fallback: 'en',
          })
        } catch (error) {
          console.warn('[sifter] Turkish language pack is unavailable:', error)
          return () => {}
        }

        try {
          const removeDictionary = ctx.locale.register(NS, 'tr', tr)
          return () => {
            removeDictionary()
            removeLanguage()
          }
        } catch (error) {
          console.warn('[sifter] Turkish dictionary could not be registered:', error)
          removeLanguage()
          return () => {}
        }
      }, 'sifter: tr language pack')

      ctx.slots.inject('sidebar.panellist', () =>
        ctx.slots.register(
          {
            name: 'sidebar.panellist',
            id: 'sifter',
            order: 100,
            label: () => t('panel.title'),
            locale: NS,
          },
          SifterIcon,
        ),
      )

      ctx.slots.inject('sidebar.session.row.leading', () =>
        ctx.slots.register(
          {
            name: 'sidebar.session.row.leading',
            id: 'sifter-select',
            order: 10,
            locale: NS,
            inject: () => ({ selection }),
          },
          SessionSelectBox,
        ),
      )

      ctx.slots.inject('main', () =>
        ctx.slots.register(
          {
            name: 'main',
            key: 'sifter',
            locale: NS,
            inject: () => ({
              selection,
              sessionsStore: sessions.list,
              workspacesStore: workspaces.list,
              workspaceService: workspaces,
              uiWorkspace,
            }),
          },
          Panel,
        ),
      )
    }

    return { inject, apply }
  },
})
