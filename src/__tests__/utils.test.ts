import { getStrByPrefix } from 'utils/getStrByPrefix';

describe('Autocomplete utility', () => {
    it('Autocomplete with one result', () => {
        expect(getStrByPrefix('They are')).toEqual([
            ' always there and they never mind.'
        ]);
    });
    it('Autocomplete with three results', () => {
        expect(getStrByPrefix('They ')).toEqual([
            'are always there and they never mind.',
            'support you with strength and grace.',
            'lift you up when you’re near to perish.'
        ]);
    });
    it('Autocomplete with no result', () => {
        expect(getStrByPrefix('No result')).toEqual([]);
    });
    it('Autocomplete with no result', () => {
        expect(
            getStrByPrefix('They are always there and they never mind.')
        ).toEqual(['']);
    });
});
