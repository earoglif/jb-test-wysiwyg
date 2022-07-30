/**
 * Плагин для подсветки ошибок
 * Сделан на основе: https://prosemirror.net/examples/lint/ и https://discuss.prosemirror.net/t/code-example-for-applying-decorations-asynchronously/3664
 * */

import { debounce } from 'lodash';
import { Plugin } from 'prosemirror-state';
import spellCheck from 'services/spellCheckerService';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';

// Ссылка для проброса данных между асинхронным функционалом и плагином
let EditorViewData: EditorView;

const lintDeco = (doc: any, asyncDecs: any[]) => {
    let decors: any[] = [];

    asyncDecs.forEach((prob: any) => {
        const from = prob.position + 1;
        const to = from + prob.word.length;
        decors.push(
            Decoration.inline(from, to, {
                class: 'error',
                'data-suggestions': prob.suggestions.join(),
                'data-from': from,
                'data-to': to
            })
        );
    });

    return DecorationSet.create(doc, decors);
};

/**
 * Проверка ошибок с задержкой в 500мс после завершения ввода текста
 */
const debouncedApiRequest = debounce(async (nodes, content) => {
    // Ограничил проверку только для первой новы в документе, чтоб не перебарщивать с запросами.
    const spellCheckData = await spellCheck(content[0]);

    EditorViewData.dispatch(
        EditorViewData.state.tr.setMeta(
            'asyncDecorations',
            spellCheckData.data.spellingErrorCount
                ? spellCheckData.data.elements[0].errors
                : []
        )
    );
}, 500);

export default new Plugin({
    props: {
        decorations(state) {
            return this.getState(state);
        }
    },
    state: {
        init: (config, state) => {
            return DecorationSet.create(state.doc, []);
        },
        apply(tr, old) {
            const { doc } = tr;

            if (tr.docChanged) {
                const nodes = [];
                const content = [];

                for (let i = 0; i < doc.childCount; i++) {
                    if (doc.child(i).textContent) {
                        nodes.push(doc.child(i));
                        content.push(doc.child(i).textContent);
                    }
                }
                debouncedApiRequest(nodes, content);
                return DecorationSet.create(doc, []);
            }

            const asyncDecs = tr.getMeta('asyncDecorations');
            if (asyncDecs === undefined) {
                return old;
            }

            return lintDeco(doc, asyncDecs);
        }
    },
    view: function (view) {
        return {
            update(view, prevState) {
                EditorViewData = view;
            }
        };
    }
});
