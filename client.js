window.__ModuleLoader__.load({
  id: 'dsh-sifter',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const NS = 'sifter'

    const en = {
      'panel.badge': 'Day 1 scaffold',
      'panel.title': 'Sifter',
      'panel.subtitle': 'Pick chats. Archive in bulk. Undo anytime.',
      'panel.scaffold':
        'The panel is live. The chat list, selection, and bulk archive come next.',
    }

    const tr = {
      'panel.badge': '1. gün iskeleti',
      'panel.title': 'Sifter',
      'panel.subtitle': 'Sohbetleri seç, tek hamlede arşivle, istediğinde geri al.',
      'panel.scaffold':
        'Panel çalışıyor. Sohbet listesi, seçim ve toplu arşivleme sırada.',
    }

    const styles = {
      root: {
        minHeight: '100%',
        boxSizing: 'border-box',
        padding: '32px',
        background: 'var(--dsw-alias-bg-base)',
        color: 'var(--dsw-alias-label-primary)',
        fontFamily: 'var(--dsw-font-family)',
      },
      card: {
        maxWidth: '640px',
        padding: '24px',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderRadius: 'var(--dsw-radius-md)',
        background: 'var(--dsw-alias-bg-layer-1)',
      },
      badge: {
        display: 'inline-block',
        marginBottom: '16px',
        padding: '2px 8px',
        borderRadius: '999px',
        background: 'var(--dsw-alias-state-business-tertiary)',
        color: 'var(--dsw-alias-state-business-primary)',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '18px',
      },
      title: {
        margin: '0 0 8px',
        fontSize: '22px',
        fontWeight: 600,
        lineHeight: '30px',
      },
      subtitle: {
        margin: '0 0 16px',
        color: 'var(--dsw-alias-label-secondary)',
        fontSize: '14px',
        lineHeight: '22px',
      },
      hint: {
        margin: 0,
        color: 'var(--dsw-alias-label-tertiary)',
        fontSize: '13px',
        lineHeight: '20px',
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
      return h(
        'div',
        { style: styles.root },
        h(
          'div',
          { style: styles.card },
          h('span', { style: styles.badge }, translate(props, 'panel.badge')),
          h('h1', { style: styles.title }, translate(props, 'panel.title')),
          h('p', { style: styles.subtitle }, translate(props, 'panel.subtitle')),
          h('p', { style: styles.hint }, translate(props, 'panel.scaffold')),
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
          },
          Panel,
        ),
      )
    }

    return { inject, apply }
  },
})
