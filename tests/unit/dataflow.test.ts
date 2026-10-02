import {describe,expect,it} from 'vitest';
import {buildReviewSignals,getUpstreamSeed,syncWorkshopToTools} from '../../src/domain/dataFlow';
import type {WorkshopWorkspace} from '../../src/domain/types';
const ws=(values:Record<string,string>,notes=''):WorkshopWorkspace=>({values,checks:{},branchFlags:{},notes,evidence:[],updatedAt:''});
describe('operating data flow',()=>{
 it('syncs SKU decision into K03 K04 K05',()=>{const out=syncWorkshopToTools({},'T01-W03',ws({sku:'SKU-01',signals:'内容+商品',unitContribution:'12.5',stop:'3轮无改善'}),'simulated');expect(out['T01-K03'].rows[0]['候选SKU']).toBe('SKU-01');expect(out['T01-K04'].rows[0]['单位贡献']).toBe('12.5');expect(out['T01-K05'].sources).toContain('T01-W03')});
 it('carries selected SKU into listing workshop',()=>{const state:any={workshopWorkspace:{'T01-W03':ws({sku:'SKU-01'})}};expect(getUpstreamSeed('T01-W04',state).sku).toBe('SKU-01')});
 it('builds W11 cross-channel review signals',()=>{const state:any={workshopWorkspace:{'T01-W03':ws({sku:'SKU-01',unitContribution:'12'}),'T01-W06':ws({ctr:'3.2',ctor:'6.5',next:'改Hook'}),'T01-W07':ws({pool:'20',priority:'5'}),'T01-W08':ws({type:'Product',decision:'继续'}),'T01-W09':ws({sku:'SKU-01',breakpoint:'CTOR'}),'T01-W10':ws({case:'订单A',health:'VTR'})},coachingCases:{'T01-P04':{evidence:[{}]},'T01-P05':{evidence:[{},{}]}},coachingState:{'T01-P04':'P04-S03','T01-P05':'P05-S04'}};const out=buildReviewSignals(state);expect(out.some(x=>x[0]==='LIVE')).toBe(true);expect(out.some(x=>x[0]==='真实订单')).toBe(true)});
});
