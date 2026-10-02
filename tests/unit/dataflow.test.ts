import {describe,expect,it} from 'vitest';
import {getUpstreamSeed,syncWorkshopToTools} from '../../src/domain/dataFlow';
import type {WorkshopWorkspace} from '../../src/domain/types';
const ws=(values:Record<string,string>):WorkshopWorkspace=>({values,checks:{},branchFlags:{},notes:'',evidence:[],updatedAt:''});
describe('operating data flow',()=>{
 it('syncs SKU decision into K05',()=>{const out=syncWorkshopToTools({},'T01-W03',ws({sku:'SKU-01',signals:'内容+商品',unitContribution:'12.5',stop:'3轮无改善'}),'simulated');expect(out['T01-K05'].rows[0]['候选SKU']).toBe('SKU-01');expect(out['T01-K05'].sources).toContain('T01-W03')});
 it('carries selected SKU into listing workshop',()=>{const state:any={workshopWorkspace:{'T01-W03':ws({sku:'SKU-01'})}};expect(getUpstreamSeed('T01-W04',state).sku).toBe('SKU-01')});
});
