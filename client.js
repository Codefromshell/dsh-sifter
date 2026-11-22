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
      'list.more': 'Load more',
      'list.ungrouped': 'Ungrouped',
      'time.justNow': 'just now',
      'time.minutes': '{n}m ago',
      'time.hours': '{n}h ago',
      'time.days': '{n}d ago',
      'status.running': 'Running',
      'status.waiting': 'Waiting',
      'status.completed': 'Done',
      'status.idle': 'Idle',
    }

    const tr = {
      'panel.badge': 'Önizleme',
      'panel.title': 'Sifter',
      'panel.subtitle': 'Sohbetleri seç, tek hamlede arşivle, istediğinde geri al.',
      'list.count': '{n} sohbet',
      'list.archivedHidden': '{n} arşivli gizli',
      'list.loading': 'Sohbetler yükleniyor…',
      'list.empty': 'Henüz sohbet yok.',
      'list.more': 'Daha fazla',
      'list.ungrouped': 'Grupsuz',
      'time.justNow': 'az önce',
      'time.minutes': '{n} dk önce',
      'time.hours': '{n} sa önce',
      'time.days': '{n} gün önce',
      'status.running': 'Çalışıyor',
      'status.waiting': 'Bekliyor',
      'status.completed': 'Bitti',
      'status.idle': 'Boşta',
    }

    const styles = {
      root: {
        minHeight: '100%',
        boxSizing: 'border-box',
        padding: '28px 32px 40px',
        background: 'var(--dsw-alias-bg-base)',
        color: 'var(--dsw-alias-label-primary)',
        fontFamily: 'var(--dsw-font-family)',
      },
      header: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '24px',
        marginBottom: '20px',
      },
      heading: {
        minWidth: 0,
      },
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
      title: {
        margin: 0,
        fontSize: '22px',
        fontWeight: 600,
        lineHeight: '30px',
      },
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
      list: {
        overflow: 'hidden',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderRadius: 'var(--dsw-radius-md)',
        background: 'var(--dsw-alias-bg-layer-1)',
      },
      row: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 110px 92px',
        alignItems: 'center',
        gap: '16px',
        minHeight: '52px',
        padding: '8px 16px',
        borderBottom: '1px solid var(--dsw-alias-border-l1)',
        boxSizing: 'border-box',
      },
      rowLast: {
        borderBottom: 'none',
      },
      rowMain: {
        minWidth: 0,
      },
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
      more: {
        display: 'block',
        width: '100%',
        marginTop: '12px',
        padding: '10px 16px',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderRadius: 'var(--dsw-radius-sm)',
        background: 'var(--dsw-alias-bg-layer-1)',
        color: 'var(--dsw-alias-label-secondary)',
        font: 'inherit',
        fontSize: '13px',
        cursor: 'pointer',
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

    function statusFor(statuses, sessionId) {
      if (statuses == null) return undefined
      if (typeof statuses.get === 'function') return statuses.get(sessionId)
      return statuses[sessionId]
    }

    function collectRows(sessions, workspaces, statuses) {
      const archived = new Set(workspaces.archivedSessionIds ?? [])
      const workspaceBySession = new Map()

      for (const workspace of workspaces.items ?? []) {
        for (const sessionId of workspace.sessionIds ?? []) {
          if (!workspaceBySession.has(sessionId)) {
            workspaceBySession.set(sessionId, workspace.title)
          }
        }
      }

      const rows = []
      for (const sessionId of sessions.ids ?? []) {
        const summary = sessions.byId?.[sessionId]
        if (summary === undefined) continue
        if (summary.origin === 'subagent') continue
        if (archived.has(sessionId)) continue

        const status = statusFor(statuses, sessionId)
        rows.push({
          id: sessionId,
          title: summary.displayTitle || summary.title || sessionId,
          workspace: workspaceBySession.get(sessionId) ?? null,
          updatedAt: summary.updatedAt ?? 0,
          running: summary.running === true || status?.running === true,
          waiting: status?.pendingInteraction != null,
          completed: status?.completionUnread === true,
        })
      }
      return rows
    }

    function rowStatus(row, t) {
      if (row.waiting) return { state: 'waiting', label: t('status.waiting') }
      if (row.running) return { state: 'running', label: t('status.running') }
      if (row.completed) return { state: 'completed', label: t('status.completed') }
      return { state: 'idle', label: t('status.idle') }
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
      const [limit, setLimit] = React.useState(100)

      const rows = React.useMemo(
        () => collectRows(sessions, workspaces, statuses),
        [sessions, workspaces, statuses],
      )
      const visibleRows = rows.slice(0, limit)
      const archivedCount = (workspaces.archivedSessionIds ?? []).length
      const loading = sessions.phase === 'pending' && rows.length === 0

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
            h('span', null, t('list.count', { n: rows.length })),
            archivedCount > 0
              ? h(
                  'span',
                  { style: styles.counterMuted },
                  t('list.archivedHidden', { n: archivedCount }),
                )
              : null,
          ),
        ),
        loading
          ? h('div', { style: styles.empty, role: 'status' }, t('list.loading'))
          : rows.length === 0
            ? h('div', { style: styles.empty, role: 'status' }, t('list.empty'))
            : h(
                'div',
                { role: 'list', 'aria-label': t('panel.title') },
                h(
                  'div',
                  { style: styles.list },
                  visibleRows.map((row, index) => {
                    const status = rowStatus(row, t)
                    const time = formatRelativeTime(row.updatedAt, t)
                    const meta = row.workspace ?? t('list.ungrouped')
                    return h(
                      'div',
                      {
                        key: row.id,
                        role: 'listitem',
                        style:
                          index === visibleRows.length - 1
                            ? { ...styles.row, ...styles.rowLast }
                            : styles.row,
                        'aria-label': [row.title, meta, status.label, time]
                          .filter(Boolean)
                          .join(', '),
                      },
                      h(
                        'div',
                        { style: styles.rowMain },
                        h('div', { style: styles.rowTitle }, row.title),
                        h('div', { style: styles.rowMeta }, meta),
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
                  }),
                ),
                rows.length > limit
                  ? h(
                      'button',
                      {
                        type: 'button',
                        style: styles.more,
                        onClick: () => setLimit((current) => current + 100),
                      },
                      t('list.more'),
                    )
                  : null,
              ),
      )
    }

    const inject = ['slots', 'sessions', 'workspaces', 'locale']

    function apply(ctx) {
      const sessions = ctx.get('sessions')
      const workspaces = ctx.get('workspaces')

      if (!sessions?.list || !workspaces?.list) {
        console.warn('[sifter] required DSH services are missing; plugin disabled')
        return
      }

      const t = ctx.locale.bind(NS)

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

      ctx.slots.inject('main', () =>
        ctx.slots.register(
          {
            name: 'main',
            key: 'sifter',
            locale: NS,
            inject: () => ({
              sessionsStore: sessions.list,
              workspacesStore: workspaces.list,
            }),
          },
          Panel,
        ),
      )
    }

    return { inject, apply }
  },
})
