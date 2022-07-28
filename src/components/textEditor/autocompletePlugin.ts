/**
 * Плагин для вывода тултипа с вариантами автозаполнения фораз. Не-не-не. Надо двигаться в сторону порталов.
 * Основа взята из примера: https://prosemirror.net/examples/tooltip/
 * */

import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

let ProxyData: EditorView;

class TestTooltip {
    private readonly tooltip: any;
    isVisible: boolean = true;

    constructor(view: any) {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tooltip';
        view.dom.parentNode.append(this.tooltip);

        this.update(view, null);
    }

    setVisible(visible: boolean) {
        this.isVisible = visible;
    }

    update(view: any, lastState: any) {
        let state = view.state;
        ProxyData = view;

        // Don't do anything if the document/selection didn't change
        if (
            lastState &&
            lastState.doc.eq(state.doc) &&
            lastState.selection.eq(state.selection)
        )
            return;

        // Hide the tooltip if the selection is empty
        if (state.selection.empty) {
            this.tooltip.style.display = 'none';
            return;
        }

        this.tooltip.style.display = '';
        let { from } = state.selection;
        let start = view.coordsAtPos(from);
        let box = this.tooltip.offsetParent.getBoundingClientRect();

        this.tooltip.style.left = start.left + 'px';
        this.tooltip.style.bottom = box.bottom - start.top + 'px';
        this.tooltip.innerHTML = 'Test';
    }
}

export default new Plugin({
    props: {
        handleDOMEvents: {
            keydown: (view, event) => {
                if (event.key === 'Tab') {
                    event.preventDefault();
                    const state = view.state;
                    const { from } = state.selection;
                    const { parent } = state.selection.$from;
                    const isInline = parent.inlineContent;

                    ProxyData.dispatch(
                        state.tr.setMeta('tooltipVisible', true)
                    );
                }
            }
        }
    },
    view(editorView) {
        return new TestTooltip(editorView);
    }
});
